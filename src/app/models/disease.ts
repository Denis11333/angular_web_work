import {IServiceMan} from "./service-man";

export interface IDisease{
    id: number
    name: string
    date: string
    serviceMan?: IServiceMan
}
