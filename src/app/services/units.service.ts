import {Injectable} from '@angular/core';
import {IUnit} from "../models/unit";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {CreateUnitDto} from "../models/dto/create-unit.dto";
import {tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class UnitsService {
    units: IUnit[]
    sharedUnits: IUnit[]

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }

    getUnitsByUser() {
        return this.http.get<IUnit[]>(`${environment.apiUrl}/units`).pipe(
            tap(units => this.units = units)
        );
    }

    createUnit(dto: CreateUnitDto) {
        return this.http.post<IUnit>(`${environment.apiUrl}/units`, dto).pipe(
            tap(unit => this.units.push(unit))
        );
    }

    editUnit(unit: IUnit) {
        return this.http.put<IUnit>(`${environment.apiUrl}/units`, {...unit, user: {id: this.authService.userId, username: this.authService.username}});
    }

    deleteUnit(unit: IUnit, units: IUnit[]) {
        return this.http.delete<IUnit>(`${environment.apiUrl}/units`, {
            body: {...unit, user: {id: this.authService.userId}}
        }).pipe(
            tap(() => {
                units.splice(this.units.findIndex(unit_ => unit_.id === unit.id), 1)
            })
        );
    }

    getSharedUnits() {
        return this.http.get<IUnit[]>(`${environment.apiUrl}/units/sharedUnits`).pipe(
            tap((sharedUnits) => this.sharedUnits = sharedUnits)
        )
    }

}
