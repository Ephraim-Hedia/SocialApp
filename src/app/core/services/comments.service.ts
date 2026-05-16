import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient)

  private get header() {
    return { headers: { token: localStorage.getItem('token') || '' } };
  }

  getPostComments(postId:string,page:number= 1,limit:number = 10):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments?page=${page}&limit=${limit}`,this.header)
  }

  createComment(postId:string ,data:FormData):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/comments`,data,this.header)
  }

  getCommentReplies(postId:string,commentId:string,page:number = 1 , limit : number = 10):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,this.header)
  }

  createReply(postId:string, commentId:string,data:FormData):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/replies`,data,this.header)
  }

  updateComment(postId:string,commentId:string,data:FormData):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`,data,this.header)
  }

  deleteComment(postId:string, commentId:string):Observable<any>
  {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`,this.header)
  }
  like_unlikeComment(postId:string,commentId:string):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/like`,null,this.header)
  }
}
