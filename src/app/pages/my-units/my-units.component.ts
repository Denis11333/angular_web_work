import {Component, OnInit} from '@angular/core';
import {UnitsService} from "../../services/units.service";
import {ModalCreateUnitService} from "../../services/modals/modal-create-unit.service";
import {WebSocketService} from "../../services/web-socket.service";
import {AuthService} from "../../services/auth.service";
import {IUnit} from "../../models/unit";
import {IServiceMan} from "../../models/service-man";


@Component({
    selector: 'app-my-units',
    templateUrl: './my-units.component.html',
    styleUrls: ['./my-units.component.css']
})
export class MyUnitsComponent implements OnInit {
    loading = false
    searchUnitText = ''

    constructor(public unitsService: UnitsService,
                public modalCreateUnitService: ModalCreateUnitService,
                private webSocketService: WebSocketService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.loading = true
        this.unitsService.getUnitsByUser().subscribe()

        this.unitsService.getSharedUnits().subscribe(() => {
            this.loading = false
        })

        const url = `ws://localhost:3000?userId=${this.authService.username}`
        this.webSocketService.connect(url);

        const socket = this.webSocketService.getSocket();

        socket.on('open', () => {
            console.log('WebSocket connection established.');
        });

        socket.on('sharedUnitsDelete', (username: string) => {
            this.unitsService.sharedUnits = this.unitsService.sharedUnits.filter(x => x.user.username !== username)
        });

        socket.on('receiveUnit', (unit: IUnit) => {

            let index = this.unitsService.units.findIndex(x => x.id === unit.id)
            if (index !== -1) {
                this.unitsService.units[index] = unit
            } else {
                let index = this.unitsService.sharedUnits.findIndex(x => x.id === unit.id)
                this.unitsService.sharedUnits[index] = unit
            }
        });

        socket.on('saveUnit', (unit: IUnit) => {

            this.unitsService.sharedUnits.push(unit)
        });

        socket.on('deleteUnit', (unit: IUnit) => {

            let index = this.unitsService.units.findIndex(x => x.id === unit.id)
            if (index !== -1) {
                this.unitsService.units.splice(index, 1)
            } else {
                let index = this.unitsService.sharedUnits.findIndex(x => x.id === unit.id)
                this.unitsService.sharedUnits.splice(index, 1)
            }
        });

        // socket.on('receiveServiceMan', (serviceMan: IServiceMan) => {
        //
        //     let index = this.unitsService.units.findIndex(x => x.id === serviceMan.unit.id)
        //     if (index !== -1) {
        //         let indexServiceMan = this.unitsService.units[index].serviceMans.findIndex(x => x.id === serviceMan.id)
        //         this.unitsService.units[index].serviceMans[indexServiceMan] = serviceMan
        //     }
        //     else {
        //         let index = this.unitsService.sharedUnits.findIndex(x => x.id === serviceMan.unit.id)
        //         let indexServiceMan = this.unitsService.sharedUnits[index].serviceMans.findIndex(x => x.id === serviceMan.id)
        //         this.unitsService.sharedUnits[index].serviceMans[indexServiceMan] = serviceMan
        //     }
        // });

        socket.on('deleteServiceMan', (serviceMan: IServiceMan) => {

            let index = this.unitsService.units.findIndex(x => x.id === serviceMan.unit.id)
            if (index !== -1) {
                let serviceManIndex = this.unitsService.units[index].serviceMans.findIndex(x => x.id === serviceMan.id)
                this.unitsService.units[index].serviceMans.splice(serviceManIndex, 1)
            } else {
                let index = this.unitsService.sharedUnits.findIndex(x => x.id === serviceMan.unit.id)
                let serviceManIndex = this.unitsService.sharedUnits[index].serviceMans.findIndex(x => x.id === serviceMan.id)
                this.unitsService.sharedUnits[index].serviceMans.splice(serviceManIndex, 1)
            }
        });

        socket.on('saveServiceMan', (serviceMan: IServiceMan) => {

            let index = this.unitsService.units.findIndex(x => x.id === serviceMan.unit.id)
            if (index !== -1) {
                this.unitsService.units[index].serviceMans.push(serviceMan)
            } else {
                let index = this.unitsService.sharedUnits.findIndex(x => x.id === serviceMan.unit.id)
                this.unitsService.sharedUnits[index].serviceMans.push(serviceMan)
            }
        });

        socket.on('close', () => {
            console.log('WebSocket connection closed.');
        });

        socket.on('error', (error: Event) => {
            console.error('WebSocket error:', error);
        });
    }

}
