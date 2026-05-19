import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpclint = inject(HttpClient)
  


  getNotification(unread:boolean = false,page : number = 1 , limit: number = 10):Observable<any>
  {
    if (unread === false )
      return this.httpclint.get(`${environment.baseUrl}/notifications?page=${page}&limit=${limit}`)
    else 
      return this.httpclint.get(`${environment.baseUrl}/notifications?unread=${unread}&page=${page}&limit=${limit}`)
  }

  getNotificationCount():Observable<any>
  {
    return this.httpclint.get(`${environment.baseUrl}/notifications/unread-count`)
  }

  markNotificationAsRead(notificationId:string):Observable<any>
  {
    return this.httpclint.patch(`${environment.baseUrl}/notifications/${notificationId}/read`,notificationId)
    
  }

  markAllNotificationAsRead():Observable<any>
  {
    return this.httpclint.patch(`${environment.baseUrl}/notifications/read-all`,null)
  }
}
