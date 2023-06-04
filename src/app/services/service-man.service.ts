import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {IServiceMan} from "../models/service-man";
import {CreateServiceManDto} from "../models/dto/create-service-man.dto";
import {IUnit} from "../models/unit";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceManService {

  constructor(private http: HttpClient) {
  }

  createServiceMan(dto : CreateServiceManDto) {
    return this.http.post<IServiceMan>(`${environment.apiUrl}/service-man`, dto);
  }

  editServiceMan(serviceMan: IServiceMan, unit: IUnit) {
    return this.http.put<IServiceMan>(`${environment.apiUrl}/service-man`, serviceMan).pipe(
      tap(() => {
        let index = unit.serviceMans.findIndex(x => x.id === serviceMan.id)

        unit.serviceMans[index] = serviceMan
      })
    )
  }

  deleteServiceMan(serviceMan : IServiceMan, unit : IUnit) {
    return this.http.delete(`${environment.apiUrl}/service-man`, {
      body: serviceMan
    }).pipe(
      tap(() => {
        let index = unit.serviceMans.findIndex(data  => data.id === serviceMan.id)

        unit.serviceMans.splice(index, 1)
      })
    );
  }
}
