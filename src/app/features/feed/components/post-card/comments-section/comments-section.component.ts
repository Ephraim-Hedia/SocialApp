import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../../../../core/models/comment.interface';

@Component({
  selector: 'app-comments-section',
  imports: [FormsModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css',
})
export class CommentsSectionComponent {
  @Input() comments: Comment[] = [];

  @Output() addComment = new EventEmitter<string>();

  commentContent = '';

  submitComment() {

    const value = this.commentContent.trim();

    if(!value) return;

    this.addComment.emit(value);

    this.commentContent = '';

  }
}
