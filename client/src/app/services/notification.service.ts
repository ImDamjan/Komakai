import { Injectable, inject } from '@angular/core';
import * as signalr from '@microsoft/signalr'
import { environment } from '../environments/environment';
import { CreateNotification } from '../models/notifications/create-notification';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  //konekcija na hub sa beka
  public connection:signalr.HubConnection = new signalr.HubConnectionBuilder()
  .withUrl(this.baseUrl +"/notificationHub")
  .configureLogging(signalr.LogLevel.Information)
  .build();

  constructor() {
    // this.startConnection();
   }

  //konektovanje na hub

  public async startConnection(){
    try{

      await this.connection.start();
    } catch(error)
    {
      console.log("Ne uspesna konekcija");
      console.log(error);
    }
  }
  //prijava na hub
  public async login(userId: number)
  {
    // console.log(userId);
    
    // const connectionObject : Connection = {
    //   UserId: userId,
    //   Room: 'asd'
    // }
    return this.connection.invoke("Login",{userId: userId});
  }

  //slanje notifikacija
  public async sendNotifcation(createNotification: CreateNotification)
  {
    // console.log(createNotification);
    // this.connection.send("sendNotification")
    return this.connection.invoke("SendNotification",createNotification);
    
  }
  //odjava sa huba
  public async logout()
  {
    return this.connection.stop();
  }
}
