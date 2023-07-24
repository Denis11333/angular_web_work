import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket: Socket;

    constructor() {
    }

    public connect(url: string): void {
        this.socket = io(url);

        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }

    public closeConnection(): void {
        this.socket.close();
    }

    public getSocket(): Socket {
        return this.socket;
    }
}
