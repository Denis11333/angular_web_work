import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalCreateServiceManService} from "../../../services/modals/modal-create-service-man.service";
import {CreateServiceManDto} from "../../../models/dto/create-service-man.dto";
import {ServiceManService} from "../../../services/service-man.service";

@Component({
  selector: 'app-modal-create-service-man',
  templateUrl: './modal-create-service-man.component.html',
  styleUrls: ['./modal-create-service-man.component.css']
})
export class ModalCreateServiceManComponent {

  constructor(public modalCreateServiceManService: ModalCreateServiceManService,
              private serviceManService: ServiceManService) {
  }

  form = new FormGroup({
    fullName: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    rank: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    position: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    status: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    isMilitary: new FormControl(false)
  });

  get fullName() {
    return this.form.controls.fullName as FormControl;
  }

  get rank() {
    return this.form.controls.rank as FormControl;
  }

  get position() {
    return this.form.controls.position as FormControl;
  }

  get status() {
    return this.form.controls.status as FormControl;
  }

  createNewServiceMan() {

    this.serviceManService.createServiceMan({
      ...this.form.value as CreateServiceManDto,
      unit: this.modalCreateServiceManService.currentUnit
    }).subscribe((serviceMan) => {
      this.modalCreateServiceManService.currentUnit.serviceMans.push(serviceMan)
    })

    this.modalCreateServiceManService.close()
  }
}
