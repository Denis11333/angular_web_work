import {
    Component,
} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    constructor(private webSocketService: WebSocketService) {
    }

    logOutAction() {
        localStorage.removeItem('auth-nestjs')
        this.webSocketService.closeConnection()
    }

    protected readonly localStorage = localStorage;
}
