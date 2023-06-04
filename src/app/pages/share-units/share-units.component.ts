import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-share-units',
  templateUrl: './share-units.component.html',
  styleUrls: ['./share-units.component.css']
})
export class ShareUnitsComponent {
    constructor(public authService: AuthService) {
    }
}
