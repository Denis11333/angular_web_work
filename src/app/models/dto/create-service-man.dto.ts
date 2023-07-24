import {IUnit} from "../unit";

export interface CreateServiceManDto{
  readonly fullName: string
  readonly rank: string
  readonly position: string
  readonly unit: IUnit
}
