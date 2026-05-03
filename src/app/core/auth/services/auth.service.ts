import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private token:string = ''

  signUp(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+"/users/signup",data)
  }

  signIn(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+"/users/signin",data)
  }

  signOut():void
  {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.router.navigate(['/login'])
  }

  changePassword(data:object):Observable<any>{
    console.log("From the Service",data)
    if(localStorage.getItem('token') != null)
    {
      this.token = localStorage.getItem('token')!
    }

    return this.httpClient.patch(environment.baseUrl+"/users/change-password",data,{
      headers:{"token":this.token}
    })
  }
}
