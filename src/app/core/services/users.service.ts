import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient)

  getFollowSugguestions(limit:number = 5):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/suggestions?limit=${limit}`)
  }
  getAllSuggestions(page: number = 1, limit: number = 20, q: string = ''): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/users/suggestions?page=${page}&limit=${limit}&q=${q}`
    );
  }

  follow_unFollowUser(userId:string):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/users/${userId}/follow`,null)
  }

  getMyProfileData():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`)
  }

  uploadProfilePhoto(data:FormData):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`,data)
  }

  getUserProfile(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/profile`)
  }
  getUserPosts(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`)
  }
  uploadProfileCover(data:FormData):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-cover`,data)
  }
  deleteProfileCover():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/users/cover`)
  }
}
