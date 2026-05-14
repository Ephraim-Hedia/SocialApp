import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient)

  private get header() {
    return { headers: { token: localStorage.getItem('token') || '' } };
  }

  getAllPosts():Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts`,this.header )
  }
  getHomeFeedPosts():Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/posts/feed?only=following&limit=20&page=1`,this.header)
  }
  getSavedPosts():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/bookmarks?limit=20&page=1`,this.header)
  }
  getMyPosts(limit:number = 20 , page:number = 1 ):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts/feed?only=me&limit=${limit}&page=${page}`,this.header)
  }
  createPost(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `/posts`,data,this.header)
  }

  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}`,this.header)
  }
  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/posts/${postId}`,this.header)
  }
  getPostLikes(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}/likes`,this.header)
  }
  like_unlikePost(postId:string):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/like`,null,this.header)
  }
  bookmark_Unbookmark(postId:string):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/bookmark`,null,this.header)
  }

}
