import { Component, inject } from '@angular/core';
import { RightSidebarComponent } from '../../features/feed/components/right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from '../../features/feed/components/left-sidebar/left-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Post } from '../../core/models/post.interface';
import { PostStateService } from '../../core/services/post-state.service';
import { CreatePostComponent } from '../../features/feed/components/create-post/create-post.component';
@Component({
  selector: 'app-feed-layout',
  imports: [RightSidebarComponent,LeftSidebarComponent,RouterOutlet,CreatePostComponent],
  templateUrl: './feed-layout.component.html',
  styleUrl: './feed-layout.component.css',
})
export class FeedLayoutComponent {
  private readonly postStateService = inject(PostStateService);

  onPostCreated(post: Post): void {
    this.postStateService.publishNewPost(post);
  }
}
