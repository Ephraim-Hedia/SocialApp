import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker.component';
import { PostsService } from '../../../../core/services/posts.service';

interface UserData {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

@Component({
  selector: 'app-create-post',
  imports: [FormsModule, EmojiPickerComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postsService = inject(PostsService);
  // emit new post to parent feed component
  postCreated = output<any>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // User
  userData = signal<UserData | null>(null);

  // Form state
  body = signal('');
  privacy = signal<'public' | 'following' | 'only_me'>('public');
  selectedImage = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  // UI state
  showPrivacyDropdown = signal(false);
  showEmojiPicker = signal(false);
  isLoading = signal(false);

  readonly privacyOptions = [
    { value: 'public',    label: 'Public',    icon: 'fa-globe' },
    { value: 'following', label: 'Followers', icon: 'fa-user-group' },
    { value: 'only_me',    label: 'Only me',   icon: 'fa-lock' },
  ] as const;

  toggleEmojiPicker(): void {
    this.showEmojiPicker.update(v => !v);
  }
  
  togglePrivacyDropdown(): void {
    this.showPrivacyDropdown.update(v => !v);
  }
  get currentPrivacy() {
    return this.privacyOptions.find(o => o.value === this.privacy()) ?? this.privacyOptions[0];
  }

  get canPost(): boolean {
    return this.body().trim().length > 0 || this.selectedImage() !== null;
  }

  ngOnInit(): void {
    const raw = localStorage.getItem('user');
    if (raw) this.userData.set(JSON.parse(raw));
  }

  onPrivacySelect(value: 'public' | 'following' | 'only_me'): void {
    this.privacy.set(value);
    this.showPrivacyDropdown.set(false);
  }

  onEmojiSelect(emoji: string): void {
    this.body.update(v => v + emoji);
    this.showEmojiPicker.set(false);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.selectedImage.set(file);
    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedImage.set(null);
    this.imagePreview.set(null);
    this.fileInput.nativeElement.value = '';
  }

  onPost(): void {
    if (!this.canPost || this.isLoading()) return;

    const formData = new FormData();
    formData.append('body', this.body());
    formData.append('privacy', this.privacy());
    if (this.selectedImage()) {
      formData.append('image', this.selectedImage()!);
    }

    this.isLoading.set(true);
    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        this.postCreated.emit(res.data.post);
        this.resetForm();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  private resetForm(): void {
    this.body.set('');
    this.selectedImage.set(null);
    this.imagePreview.set(null);
    this.privacy.set('public');
    this.showEmojiPicker.set(false);
    this.showPrivacyDropdown.set(false);
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
