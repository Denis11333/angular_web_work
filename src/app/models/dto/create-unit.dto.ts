import {IServiceMan} from "../service-man";

export interface CreateUnitDto{
  readonly name: string
  readonly description: string
  readonly serviceMans: IServiceMan[]
}
