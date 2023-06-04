import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitsService} from "../../../services/units.service";
import {ModalEditUnitService} from "../../../services/modals/modal-edit-unit.service";

@Component({
  selector: 'app-modal-edit-unit',
  templateUrl: './modal-edit-unit.component.html',
  styleUrls: ['./modal-edit-unit.component.css']
})
export class ModalEditUnitComponent {
  constructor(public modalEditUnitService: ModalEditUnitService,
              private unitsService: UnitsService) {
  }

  form = new FormGroup({
    name: new FormControl(this.modalEditUnitService.changeUnit.name,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    description: new FormControl(this.modalEditUnitService.changeUnit.description,
      [
        Validators.maxLength(5000)
      ]
    ),
  });

  get name() {
    return this.form.controls.name as FormControl;
  }

  get description() {
    return this.form.controls.description as FormControl;
  }

  editUnit() {
    this.modalEditUnitService.changeUnit.name = this.name.value
    this.modalEditUnitService.changeUnit.description = this.description.value
    this.unitsService.editUnit(this.modalEditUnitService.changeUnit).subscribe()

    this.modalEditUnitService.close()
  }
}
