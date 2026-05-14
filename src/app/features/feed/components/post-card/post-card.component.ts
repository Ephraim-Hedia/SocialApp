import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostContentComponent } from './post-content/post-content.component';
import { PostStatsComponent } from './post-stats/post-stats.component'
import { PostActionsComponent } from './post-actions/post-actions.component';
import { Post } from '../../../../core/models/post.interface';
import { CommentsSectionComponent } from './comments-section/comments-section.component';


@Component({
  selector: 'app-post-card',
  imports: [PostHeaderComponent,
    PostContentComponent,
    PostStatsComponent,
    PostActionsComponent,
    CommentsSectionComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Output() like = new EventEmitter<Post>();
  @Output() save = new EventEmitter<Post>();


  comments = [
    {
      _id: '1',
      content: 'Awesome post 🔥',
  
      createdAt: '',
  
      user: {
        _id: '1',
        name: 'Larissa',
        username: 'hahiholer',
        photo: 'imgs/default-profile.png'
      }
    }
  ];
  showComments = false;

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
