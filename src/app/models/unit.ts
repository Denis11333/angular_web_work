import {IServiceMan} from "./service-man";
import {IUser} from "./user";

export interface IUnit{
  id: number
  name: string
  description: string
  serviceMans: IServiceMan[]
  user: IUser
}
