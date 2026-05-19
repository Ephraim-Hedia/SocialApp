import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../../../../core/services/comments.service';
import { Comment } from '../../../../../core/models/comment.interface';
import { Post, TopComment } from '../../../../../core/models/post.interface';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { TimeAgoPipe } from '../../../../../shared/pipes/time-ago-pipe';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [FormsModule, CommentCardComponent, TimeAgoPipe],
  templateUrl: './comments-section.component.html',
})
export class CommentsSectionComponent implements OnInit {
  @Input({ required: true }) post!: Post;

  private readonly commentsService = inject(CommentsService);

  readonly currentUserId =
    JSON.parse(localStorage.getItem('user') || '{}')._id ?? '';
  readonly currentUserPhoto =
    JSON.parse(localStorage.getItem('user') || '{}').photo ?? 'imgs/default-profile.png';
  readonly currentUserName =
    JSON.parse(localStorage.getItem('user') || '{}').name ?? '';

  // State
  comments = signal<Comment[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);
  showAllComments = signal(false);

  // Input state
  commentContent = signal('');
  commentImage = signal<File | null>(null);
  commentImagePreview = signal<string | null>(null);

  ngOnInit(): void {}

  // ── TOP COMMENT ──────────────────────────────────────────

  get hasTopComment(): boolean {
    return !!this.post.topComment?._id;
  }

  // ── LOAD ALL COMMENTS ────────────────────────────────────

  viewAllComments(): void {
    this.isLoading.set(true);
    this.commentsService.getPostComments(this.post._id).subscribe({
      next: (res) => {
        this.comments.set(res.data.comments);
        this.showAllComments.set(true);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  // ── CREATE COMMENT ───────────────────────────────────────

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.commentImage.set(file);
    const reader = new FileReader();
    reader.onload = () => this.commentImagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.commentImage.set(null);
    this.commentImagePreview.set(null);
  }

  submitComment(): void {
    const content = this.commentContent().trim();
    if (!content && !this.commentImage()) return;

    const formData = new FormData();
    formData.append('content', content);
    if (this.commentImage()) {
      formData.append('image', this.commentImage()!);
    }

    this.isSubmitting.set(true);
    this.commentsService.createComment(this.post._id, formData).subscribe({
      next: (res) => {
        this.comments.update(list => [res.data.comment, ...list]);
        this.post.commentsCount++;
        this.commentContent.set('');
        this.commentImage.set(null);
        this.commentImagePreview.set(null);
        this.isSubmitting.set(false);
        // show all comments if not already showing
        this.showAllComments.set(true);
      },
      error: (err) => {
        console.log(err);
        this.isSubmitting.set(false);
      },
    });
  }

  // ── DELETE COMMENT ───────────────────────────────────────

  onDeleteComment(commentId: string): void {
    this.commentsService.deleteComment(this.post._id, commentId).subscribe({
      next: () => {
        this.comments.update(list =>
          list.filter(c => c._id !== commentId)
        );
        this.post.commentsCount--;
      },
      error: (err) => console.log(err),
    });
  }
}