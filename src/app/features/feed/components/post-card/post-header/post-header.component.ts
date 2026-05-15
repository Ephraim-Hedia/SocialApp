import { Component, Input } from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';
import { TimeAgoPipe } from '../../../../../shared/pipes/time-ago-pipe';

@Component({
  selector: 'app-post-header',
  imports: [TimeAgoPipe],
  templateUrl: './post-header.component.html',
  styleUrl: './post-header.component.css',
})
export class PostHeaderComponent {
  @Input({ required: true }) post!: Post;

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
