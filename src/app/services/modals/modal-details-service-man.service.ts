import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IServiceMan} from "../../models/service-man";
import {IUnit} from "../../models/unit";

@Injectable({
  providedIn: 'root'
})
export class ModalDetailsServiceManService {
  isVisible$ = new BehaviorSubject<boolean>(false)
  unit: IUnit
  serviceMan: IServiceMan

  open(serviceMan: IServiceMan, unit: IUnit) {
    this.serviceMan = serviceMan
    this.unit = unit
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
  }
}
