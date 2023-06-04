import { Pipe, PipeTransform } from '@angular/core';
import {IUnit} from "../models/unit";

@Pipe({
  name: 'filterUnits'
})
export class FilterUnitsPipe implements PipeTransform {

  transform(units: IUnit[], unitName: string): IUnit[] {
    if(unitName.length === 0) return units
    return units.filter(unit => unit.name.toLowerCase().includes(unitName.toLowerCase()));
  }

}
