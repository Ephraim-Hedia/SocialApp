import { Component, effect, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostActionsService } from '../../../../core/services/post-actions.service';
import { PostStateService } from '../../../../core/services/post-state.service';

@Component({
  selector: 'app-community-posts',
  imports: [PostCardComponent],
  templateUrl: './community-posts.component.html',
  styleUrl: './community-posts.component.css',
})
export class CommunityPostsComponent implements OnInit {
  
  private readonly postsService = inject(PostsService);
  private readonly postStateService = inject(PostStateService);
  private readonly postActionsService = inject(PostActionsService);

  posts: Post[] = [];

  constructor() {
    effect(() => {
      const newPost = this.postStateService.newPost();
      if (newPost) {
        this.posts.unshift(newPost);
        this.postStateService.clearNewPost();
      }
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts()
  {
    this.postsService.getAllPosts().subscribe({
      next : (res)=> {
        console.log(res)
        this.posts = res.data.posts
      },
      error : (err) => {
        console.log(err)
      },
      complete : ()=> {
        this.posts = this.postActionsService.normalizePostsLikes(this.posts);
      }
    })
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
