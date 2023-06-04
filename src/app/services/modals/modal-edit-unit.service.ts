import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUnit} from "../../models/unit";

@Injectable({
  providedIn: 'root'
})
export class ModalEditUnitService {
  isVisible$ = new BehaviorSubject<boolean>(false)
  changeUnit: IUnit

  open(unit: IUnit) {
    this.changeUnit = unit
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
  }
}
