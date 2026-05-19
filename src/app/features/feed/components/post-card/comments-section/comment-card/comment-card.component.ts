import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../../../../../../shared/pipes/time-ago-pipe';
import { Comment } from '../../../../../../core/models/comment.interface';
import { Reply } from '../../../../../../core/models/reply.interface';
import { CommentsService } from '../../../../../../core/services/comments.service';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [FormsModule, TimeAgoPipe],
  templateUrl: './comment-card.component.html',
})
export class CommentCardComponent implements OnInit {
  @Input({ required: true }) comment!: Comment;
  @Input({ required: true }) postId!: string;
  @Input({ required: true }) currentUserId!: string;
  @Output() deleteComment = new EventEmitter<string>();

  private readonly commentsService = inject(CommentsService);

  // Replies state
  replies = signal<Reply[]>([]);
  showReplies = signal(false);
  isLoadingReplies = signal(false);

  // Reply input state
  showReplyInput = signal(false);
  replyContent = signal('');
  replyImage = signal<File | null>(null);
  replyImagePreview = signal<string | null>(null);
  isSubmittingReply = signal(false);

  // Like state
  isLiked = signal(false);
  likesCount = signal(0);

  // Menu
  showMenu = signal(false);

  ngOnInit(): void {
    this.likesCount.set(this.comment.likes?.length ?? 0);
    this.isLiked.set(this.comment.likes?.includes(this.currentUserId) ?? false);
  }

  // ── REPLIES ──────────────────────────────────────────────

  toggleReplies(): void {
    if (this.showReplies()) {
      this.showReplies.set(false);
      return;
    }
    this.loadReplies();
  }

  loadReplies(): void {
    this.isLoadingReplies.set(true);
    this.commentsService.getCommentReplies(this.postId, this.comment._id).subscribe({
      next: (res) => {
        this.replies.set(res.data.replies);
        this.showReplies.set(true);
        this.isLoadingReplies.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoadingReplies.set(false);
      },
    });
  }

  toggleReplyInput(): void {
    this.showReplyInput.update(v => !v);
  }

  onReplyImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.replyImage.set(file);
    const reader = new FileReader();
    reader.onload = () => this.replyImagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  removeReplyImage(): void {
    this.replyImage.set(null);
    this.replyImagePreview.set(null);
  }

  submitReply(): void {
    const content = this.replyContent().trim();
    if (!content && !this.replyImage()) return;

    const formData = new FormData();
    formData.append('content', content);
    if (this.replyImage()) {
      formData.append('image', this.replyImage()!);
    }

    this.isSubmittingReply.set(true);
    this.commentsService
      .createReply(this.postId, this.comment._id, formData)
      .subscribe({
        next: (res) => {
          this.replies.update(list => [...list, res.data.reply]);
          this.showReplies.set(true);
          this.replyContent.set('');
          this.replyImage.set(null);
          this.replyImagePreview.set(null);
          this.showReplyInput.set(false);
          this.isSubmittingReply.set(false);
          // update replies count locally
          this.comment.repliesCount++;
        },
        error: (err) => {
          console.log(err);
          this.isSubmittingReply.set(false);
        },
      });
  }

  // ── LIKE ─────────────────────────────────────────────────

  toggleLike(): void {
    // optimistic update
    const wasLiked = this.isLiked();
    this.isLiked.set(!wasLiked);
    this.likesCount.update(v => wasLiked ? v - 1 : v + 1);

    this.commentsService.like_unlikeComment(this.postId, this.comment._id).subscribe({
      error: (err) => {
        // revert on failure
        console.log(err);
        this.isLiked.set(wasLiked);
        this.likesCount.update(v => wasLiked ? v + 1 : v - 1);
      },
    });
  }

  // ── DELETE ───────────────────────────────────────────────

  onDelete(): void {
    this.deleteComment.emit(this.comment._id);
    this.showMenu.set(false);
  }

  toggleMenu(): void {
    this.showMenu.update(v => !v);
  }

  // ── REPLY DELETE ─────────────────────────────────────────

  deleteReply(replyId: string): void {
    this.commentsService.deleteComment(this.postId, replyId).subscribe({
      next: () => {
        this.replies.update(list => list.filter(r => r._id !== replyId));
        this.comment.repliesCount--;
      },
      error: (err) => console.log(err),
    });
  }
}