import {IUnit} from "./unit";
import {IDisease} from "./disease";

export interface IServiceMan{
  id: number
  fullName: string
  rank: string
  position: string
  notes: string
  dateOfBirth: string
  nationality: string
  religiousBeliefs: string
  placeOfBirth: string
  sex: string
  maritalStatus: string
  phoneNumber: string
  dataOfEntryIntoMilitaryService: string
  specialty: string
  qualification: string
  militaryTicketNumber: string
  passportNumber: string
  historyOfDiseases: string
  financialSupport: number
  serviceTraffic: string
  operations: string
  image: string
  diseases: IDisease[]
  unit : IUnit
}
