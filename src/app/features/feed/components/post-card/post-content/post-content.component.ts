import { Component, Input } from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';

@Component({
  selector: 'app-post-content',
  imports: [],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.css',
})
export class PostContentComponent {
  @Input({ required: true }) post!: Post;


  showPreview = false;

  openPreview() {
    this.showPreview = true;
  }

  closePreview() {
    this.showPreview = false;
  }
}
