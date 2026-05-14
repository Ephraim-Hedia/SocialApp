import { Injectable, signal } from '@angular/core';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostStateService {
  // Signal that holds the latest created post
  // null means no new post yet
  private readonly _newPost = signal<Post | null>(null);

  // Public read-only signal for components to listen to
  readonly newPost = this._newPost.asReadonly();

  publishNewPost(post: Post): void {
    this._newPost.set(post);
  }

  clearNewPost(): void {
    this._newPost.set(null);
  }
}
