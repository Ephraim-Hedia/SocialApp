import {
  Component, inject, OnInit, signal, ViewChild, ElementRef
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostCardComponent } from '../feed/components/post-card/post-card.component';
import { UsersService } from '../../core/services/users.service';
import { PostsService } from '../../core/services/posts.service';
import { MyProfileData } from '../../core/models/my-profile-data.interface';
import { Post } from '../../core/models/post.interface';

type ProfileTab = 'posts' | 'saved';
@Component({
  selector: 'app-profile',
  imports: [PostCardComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(UsersService);
  private readonly postsService = inject(PostsService);

  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('coverInput') coverInput!: ElementRef<HTMLInputElement>;

  // State
  isMyProfile = signal(false);
  isLoading = signal(true);
  activeTab = signal<ProfileTab>('posts');

  // Profile data
  myProfile = signal<MyProfileData | null>(null);
  friendProfile = signal<any>(null);
  myPostsCount = signal(0);

  // Posts
  posts = signal<Post[]>([]);

  // Follow state
  isFollowing = signal(false);

  // Cover state
  hasCover = signal(false);

  // UI
  isUploadingPhoto = signal(false);
  isUploadingCover = signal(false);
  isRemovingCover = signal(false);
  isFollowLoading = signal(false);

  private userId: string | null = null;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isMyProfile.set(!this.userId);

    if (this.isMyProfile()) {
      this.loadMyProfile();
    } else {
      this.loadFriendProfile();
    }
  }

  // ─── MY PROFILE ───────────────────────────────────────────

  loadMyProfile(): void {
    this.isLoading.set(true);
    this.usersService.getMyProfileData().subscribe({
      next: (res) => {
        this.myProfile.set(res.data.user);
        this.hasCover.set(!!res.data.user.cover);
        this.isLoading.set(false);
        this.loadMyPosts();
        this.loadSavedPosts();
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  loadMyPosts(): void {
    this.postsService.getMyPosts().subscribe({
      next: (res) => {
        this.posts.set(res.data.posts);
        this.myPostsPosts.set(res.data.posts)
        this.myPostsCount.set(res.meta.pagination.total);
      },
      error: (err) => console.log(err),
    });
  }

  loadSavedPosts(): void {
    this.postsService.getSavedPosts().subscribe({
      next: (res) => {
        // stored separately to switch tabs
        this.savedPosts.set(res.data.bookmarks);
      },
      error: (err) => console.log(err),
    });
  }

  savedPosts = signal<Post[]>([]);

  onTabChange(tab: ProfileTab): void {
    this.activeTab.set(tab);
    if (tab === 'posts') {
      console.log(tab)
      this.posts.set(this.myPostsPosts());
    } else {
      console.log(tab)
      this.posts.set(this.savedPosts());
    }
  }

  // store my posts separately for tab switching
  myPostsPosts = signal<Post[]>([]);

  // ─── FRIEND PROFILE ───────────────────────────────────────

  loadFriendProfile(): void {
    this.isLoading.set(true);
    this.usersService.getUserProfile(this.userId!).subscribe({
      next: (res) => {
        this.friendProfile.set(res.data.user);
        this.hasCover.set(!!res.data.user.cover);
        // check if already following
        const myId = JSON.parse(localStorage.getItem('user') || '{}')._id;
        this.isFollowing.set(res.data.isFollowing ? true : false);
        this.isLoading.set(false);
        this.loadFriendPosts();
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  loadFriendPosts(): void {
    this.usersService.getUserPosts(this.userId!).subscribe({
      next: (res) => this.posts.set(res.data.posts),
      error: (err) => console.log(err),
    });
  }

  toggleFollow(): void {
    this.isFollowLoading.set(true);
    this.usersService.follow_unFollowUser(this.userId!).subscribe({
      next: (res) => {
        this.isFollowing.set(res.data.followed);
        this.isFollowLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isFollowLoading.set(false);
      },
    });
  }

  // ─── PHOTO UPLOAD ─────────────────────────────────────────

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('photo', file);
    this.isUploadingPhoto.set(true);
    this.usersService.uploadProfilePhoto(formData).subscribe({
      next: (res) => {
        // update local profile photo
        this.myProfile.update(p => p ? { ...p, photo: res.data.user.photo } : p);
        // update localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.photo = res.data.user.photo;
        localStorage.setItem('user', JSON.stringify(user));
        this.isUploadingPhoto.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isUploadingPhoto.set(false);
      },
    });
  }

  // ─── COVER ────────────────────────────────────────────────

  onCoverSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('cover', file);
    this.isUploadingCover.set(true);
    this.usersService.uploadProfileCover(formData).subscribe({
      next: (res) => {
        this.myProfile.update(p => p ? { ...p, cover: res.data.user.cover } : p);
        this.hasCover.set(true);
        this.isUploadingCover.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isUploadingCover.set(false);
      },
    });
  }

  removeCover(): void {
    this.isRemovingCover.set(true);
    this.usersService.deleteProfileCover().subscribe({
      next: () => {
        this.myProfile.update(p => p ? { ...p, cover: '' } : p);
        this.hasCover.set(false);
        this.isRemovingCover.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isRemovingCover.set(false);
      },
    });
  }

  // ─── POST ACTIONS ─────────────────────────────────────────

  toggleLike(post: Post): void {
    this.postsService.like_unlikePost(post._id).subscribe({
      next: (res) => {
        this.posts.update(list =>
          list.map(p => p._id === post._id ? {
            ...p,
            likesCount: res.data.liked ? p.likesCount + 1 : p.likesCount - 1,
            isLiked: res.data.liked,
          } : p)
        );
      },
      error: (err) => console.log(err),
    });
  }

  toggleSave(post: Post): void {
    this.postsService.bookmark_Unbookmark(post._id).subscribe({
      complete: () => {
        this.posts.update(list =>
          list.map(p => p._id === post._id
            ? { ...p, bookmarked: !p.bookmarked } : p)
        );
      },
      error: (err) => console.log(err),
    });
  }
}
