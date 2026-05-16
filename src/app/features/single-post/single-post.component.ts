import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/models/post.interface';
import { PostCardComponent } from '../feed/components/post-card/post-card.component';
import { PostActionsService } from '../../core/services/post-actions.service';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './single-post.component.html',
})
export class SinglePostComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  private readonly location = inject(Location);
  private readonly postActionsService = inject(PostActionsService)

  post = signal<Post | null>(null);
  isLoading = signal(true);
  isNotFound = signal(false);

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
    }
  }

  loadPost(postId: string): void {
    this.isLoading.set(true);
    this.postsService.getSinglePost(postId).subscribe({
      next: (res) => {
        const post = res.data.post;
        // check isLiked
        this.post.set(this.postActionsService.normalizePostsLikes([post])[0]);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isNotFound.set(true);
        this.isLoading.set(false);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
  // ADD these clean methods:
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