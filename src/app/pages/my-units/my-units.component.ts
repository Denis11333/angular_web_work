import {Component, OnInit} from '@angular/core';
import {UnitsService} from "../../services/units.service";
import {ModalCreateUnitService} from "../../services/modals/modal-create-unit.service";


@Component({
  selector: 'app-my-units',
  templateUrl: './my-units.component.html',
  styleUrls: ['./my-units.component.css']
})
export class MyUnitsComponent implements OnInit {
  loading = false
  searchUnitText = ''

  constructor(public unitsService: UnitsService,
              public modalCreateUnitService : ModalCreateUnitService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.unitsService.getUnitsByUser().subscribe()

    this.unitsService.getSharedUnits().subscribe(() => {
      this.loading = false
    })
  }

}
