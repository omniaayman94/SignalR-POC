import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  newValue$ = new Subject<number>();
  private hubConnection: HubConnection;
  connectionEstablished$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  private createConnection() {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/coolmessages')
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }
  
  private startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(
      () => {
        console.log('Hub connection started!');
        this.connectionEstablished$.next(true);
      },
      error => console.error(error)
    );
  }

  private registerOnServerEvents(): void {
    
    this.hubConnection.on('newValue', (data: number) => {
      this.newValue$.next(data);
    });
  }
}
