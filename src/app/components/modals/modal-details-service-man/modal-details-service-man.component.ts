import {Component, Input, OnInit} from '@angular/core';
import {IServiceMan} from "../../../models/service-man";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDetailsServiceManService} from "../../../services/modals/modal-details-service-man.service";
import {ServiceManService} from "../../../services/service-man.service";

@Component({
  selector: 'app-modal-details-service-man',
  templateUrl: './modal-details-service-man.component.html',
  styleUrls: ['./modal-details-service-man.component.css']
})
export class ModalDetailsServiceManComponent {
  constructor(public modalDetailsServiceManService: ModalDetailsServiceManService,
              private serviceManService: ServiceManService) {
  }

  form = new FormGroup({
    fullName: new FormControl(this.modalDetailsServiceManService.serviceMan.fullName,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    rank: new FormControl(this.modalDetailsServiceManService.serviceMan.rank,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    position: new FormControl(this.modalDetailsServiceManService.serviceMan.position,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    status: new FormControl(this.modalDetailsServiceManService.serviceMan.status,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    statusDescription: new FormControl(this.modalDetailsServiceManService.serviceMan.statusDescription,
      [
        Validators.maxLength(200)
      ]),
    notes: new FormControl(this.modalDetailsServiceManService.serviceMan.notes,
      [
        Validators.maxLength(200)
      ]),
    isMilitary: new FormControl(this.modalDetailsServiceManService.serviceMan.isMilitary)
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

  get statusDescription() {
    return this.form.controls.statusDescription as FormControl;
  }

  get notes() {
    return this.form.controls.notes as FormControl;
  }

  editServiceMan() {
    this.modalDetailsServiceManService.serviceMan = {...this.modalDetailsServiceManService.serviceMan, ...this.form.value} as IServiceMan

    this.serviceManService.editServiceMan({...this.modalDetailsServiceManService.serviceMan, ...this.form.value} as IServiceMan,
      this.modalDetailsServiceManService.unit).subscribe()

    this.modalDetailsServiceManService.close()
  }

}
