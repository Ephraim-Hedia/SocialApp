import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient)

  getAllPosts():Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts` )
  }
  getHomeFeedPosts():Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/posts/feed?only=following&limit=20&page=1`)
  }
  getSavedPosts():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/bookmarks?limit=20&page=1`)
  }
  getMyPosts(limit:number = 20 , page:number = 1 ):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts/feed?only=me&limit=${limit}&page=${page}`)
  }
  createPost(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `/posts`,data)
  }

  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}`)
  }
  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/posts/${postId}`)
  }
  getPostLikes(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}/likes`)
  }
  like_unlikePost(postId:string):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/like`,null)
  }
  bookmark_Unbookmark(postId:string):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/bookmark`,null)
  }

}
