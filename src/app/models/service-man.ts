import {IUnit} from "./unit";

export interface IServiceMan{
  id: number
  fullName: string
  rank: string
  position: string
  status: string
  statusDescription: string
  notes: string
  isMilitary: boolean
  unit : IUnit
}
