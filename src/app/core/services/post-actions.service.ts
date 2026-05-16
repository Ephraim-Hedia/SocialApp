import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PostsService } from './posts.service';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostActionsService {
  private readonly postsService = inject(PostsService);

  toggleLike(post: Post): Observable<any> {
    return this.postsService.like_unlikePost(post._id).pipe(
      tap((res) => {
        if (res.data.liked) {
          post.likesCount++;
          post.isLiked = true;
        } else {
          post.likesCount--;
          post.isLiked = false;
        }
      })
    );
  }

  toggleSave(post: Post): Observable<any> {
    return this.postsService.bookmark_Unbookmark(post._id).pipe(
      tap(() => {
        post.bookmarked = !post.bookmarked;
      })
    );
  }

  // ── NEW ──────────────────────────────────────────────────
  normalizePostsLikes(posts: Post[]): Post[] {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    return posts.map(post => ({
      ...post,
      isLiked: post.likes?.includes(currentUser._id) ?? false,
    }));
  }
}