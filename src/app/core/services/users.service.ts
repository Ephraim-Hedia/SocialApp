import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient)


  private get header() {
    return { headers: { token: localStorage.getItem('token') || '' } };
  }

  getFollowSugguestions(limit:number = 5):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/suggestions?limit=${limit}`,this.header)
  }
  getAllSuggestions(page: number = 1, limit: number = 20, q: string = ''): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/users/suggestions?page=${page}&limit=${limit}&q=${q}`,
      this.header
    );
  }

  follow_unFollowUser(userId:string):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/users/${userId}/follow`,null,this.header)
  }

  getMyProfileData():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`,this.header)
  }

  uploadProfilePhoto(data:FormData):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`,data,this.header)
  }

  getUserProfile(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/profile`,this.header)
  }
  getUserPosts(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`,this.header)
  }
  uploadProfileCover(data:FormData):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-cover`,data,this.header)
  }
  deleteProfileCover():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/users/cover`,this.header)
  }
}
