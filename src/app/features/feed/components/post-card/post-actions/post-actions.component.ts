import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';
import { PostsService } from '../../../../../core/services/posts.service';

@Component({
  selector: 'app-post-actions',
  imports: [],
  templateUrl: './post-actions.component.html',
  styleUrl: './post-actions.component.css',
})
export class PostActionsComponent {
  postService  = inject(PostsService)
  @Input({ required: true }) post!: Post;

  @Output() like = new EventEmitter<void>();
  @Output() comment = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>()
}
