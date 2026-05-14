import { Component, Input } from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';

@Component({
  selector: 'app-post-stats',
  imports: [],
  templateUrl: './post-stats.component.html',
  styleUrl: './post-stats.component.css',
})
export class PostStatsComponent {
  @Input({ required: true }) post!: Post;
}
