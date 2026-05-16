import { Component, effect, inject, OnInit } from '@angular/core';

import { Post } from '../../../../core/models/post.interface';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostsService } from '../../../../core/services/posts.service';
import { PostStateService } from '../../../../core/services/post-state.service';
import { PostActionsService } from '../../../../core/services/post-actions.service';

@Component({
  selector: 'app-feed',
  imports: [PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {

  private readonly postsService = inject(PostsService)
  private readonly postStateService = inject(PostStateService);
  private readonly postActionsService = inject(PostActionsService)
  posts: Post[] = []

  constructor() {
    // React to new posts from the layout
    effect(() => {
      const newPost = this.postStateService.newPost();
      if (newPost) {
        this.posts.unshift(newPost);
        this.postStateService.clearNewPost();
      }
    });
  }
  
  ngOnInit(): void {
    this.getAllPosts()
  }
  
  getAllPosts():void {
    this.postsService.getHomeFeedPosts().subscribe(
      {
        next : (res)=>{
          console.log(res)
          this.posts = res.data.posts
        },
        error : (err)=>{
          console.log(err)
        }, 
        complete : ()=>{
          this.posts = this.postActionsService.normalizePostsLikes(this.posts);
        }
      }
    )
  }

  toggleLike(post: Post): void {
    this.postActionsService.toggleLike(post).subscribe({
      error: (err) => console.log(err),
    });
  }

  toggleSave(post: Post): void {
    this.postActionsService.toggleSave(post).subscribe({
      error: (err) => console.log(err),
    });
  }
}
