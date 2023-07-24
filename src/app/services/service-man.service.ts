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

    currentServiceMan: IServiceMan

    constructor(private http: HttpClient) {
    }

    createServiceMan(dto: CreateServiceManDto) {
        return this.http.post<IServiceMan>(`${environment.apiUrl}/service-man`, dto);
    }

    deletePhoto(serviceMan: IServiceMan) {
        return this.http.post<IServiceMan>(`${environment.apiUrl}/service-man/delete/photo`, serviceMan);
    }

    editServiceMan(form: FormData) {
        return this.http.put<IServiceMan>(`${environment.apiUrl}/service-man`, form)
            .pipe(
                tap(serviceMan => this.currentServiceMan = serviceMan)
            )
    }

    deleteServiceMan(serviceMan: IServiceMan, unit: IUnit) {
        return this.http.delete(`${environment.apiUrl}/service-man`, {
            body: {...serviceMan, unit: {id: unit.id}}
        }).pipe(
            tap(() => {
                let index = unit.serviceMans.findIndex(data => data.id === serviceMan.id)

                unit.serviceMans.splice(index, 1)
            })
        );
    }

    getServiceManById(serviceManId: number) {
        return this.http.get<IServiceMan>(`${environment.apiUrl}/service-man/${serviceManId}`)
            .pipe(
                tap((serviceMan) => this.currentServiceMan = serviceMan)
            )
    }
}
