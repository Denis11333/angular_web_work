import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUnit} from "../../models/unit";

@Injectable({
  providedIn: 'root'
})
export class ModalCreateServiceManService {
  isVisible$ = new BehaviorSubject<boolean>(false)
  currentUnit: IUnit

  open(unit: IUnit) {
    this.currentUnit = unit
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
  }
}
