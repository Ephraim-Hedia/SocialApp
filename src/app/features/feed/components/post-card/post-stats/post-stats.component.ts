import { Component, Input } from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-stats',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './post-stats.component.html',
  styleUrl: './post-stats.component.css',
})
export class PostStatsComponent {
  @Input({ required: true }) post!: Post;
}
