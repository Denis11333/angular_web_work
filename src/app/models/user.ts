import {IRole} from "./role";

export interface IUser{
  id : number
  username: string
  roles : IRole[]
  shared_users?: IUser[]
}
