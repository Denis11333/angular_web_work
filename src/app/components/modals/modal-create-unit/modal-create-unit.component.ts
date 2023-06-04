import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitsService} from "../../../services/units.service";
import {ModalCreateUnitService} from "../../../services/modals/modal-create-unit.service";
import {CreateUnitDto} from "../../../models/dto/create-unit.dto";

@Component({
  selector: 'app-modal-create-unit',
  templateUrl: './modal-create-unit.component.html',
  styleUrls: ['./modal-create-unit.component.css']
})
export class ModalCreateUnitComponent {
  constructor(private unitsService: UnitsService,
              public modalCreateUnitService: ModalCreateUnitService) {
  }

  form = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
    description: new FormControl('',
      [
        Validators.maxLength(5000)
      ]),
  });

  get name() {
    return this.form.controls.name as FormControl;
  }

  get description() {
    return this.form.controls.description as FormControl
  }

  createUnit() {
    this.unitsService.createUnit({...this.form.value as CreateUnitDto, serviceMans: []}).subscribe()

    this.modalCreateUnitService.close()
  }

}

