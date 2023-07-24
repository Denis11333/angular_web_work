import {Component, Input} from '@angular/core';
import {IUnit} from "../../models/unit";
import {IServiceMan} from "../../models/service-man";
import {UnitsService} from "../../services/units.service";
import {ModalEditUnitService} from "../../services/modals/modal-edit-unit.service";
import {ModalCreateServiceManService} from "../../services/modals/modal-create-service-man.service";
import {ServiceManService} from "../../services/service-man.service";

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
})
export class UnitComponent {
  @Input() unitsReference: IUnit[]
  @Input() unit: IUnit

  detailsOrEditServiceMan: IServiceMan
  isShowUnitInformation = false;
  isFullAbout = true

  constructor(public unitService: UnitsService,
              public serviceManService: ServiceManService,
              public modalEditUnitService: ModalEditUnitService,
              public modalCreateServiceManService: ModalCreateServiceManService) {
  }

  showUnitInformation() {
    this.isShowUnitInformation = !this.isShowUnitInformation
  }

}
