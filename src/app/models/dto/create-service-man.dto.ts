import {IUnit} from "../unit";

export interface CreateServiceManDto{
  readonly fullName: string
  readonly rank: string
  readonly position: string
  readonly status: string
  readonly statusDescription: string
  readonly isMilitary: boolean
  readonly unit: IUnit
}
