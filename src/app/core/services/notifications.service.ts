import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpclint = inject(HttpClient)
  
  private get header() {
    return { headers: { token: localStorage.getItem('token') || '' } };
  }

  getNotification(unread:boolean = false,page : number = 1 , limit: number = 10):Observable<any>
  {
    return this.httpclint.get(`${environment.baseUrl}/notifications?unread=${unread}&page=${page}&limit=${limit}`,this.header)
  }

  getNotificationCount():Observable<any>
  {
    return this.httpclint.get(`${environment.baseUrl}/notifications/unread-count`,this.header)
  }

  markNotificationAsRead(notificationId:string):Observable<any>
  {
    return this.httpclint.patch(`${environment.baseUrl}/notifications/${notificationId}/read`,this.header)
  }

  markAllNotificationAsRead():Observable<any>
  {
    return this.httpclint.patch(`${environment.baseUrl}/notifications/read-all`,this.header)
  }
}
