import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/post.interface';
import { PostsService } from '../../../../core/services/posts.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostActionsService } from '../../../../core/services/post-actions.service';

@Component({
  selector: 'app-saved-posts',
  imports: [PostCardComponent],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css',
})
export class SavedPostsComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly postActionsService = inject(PostActionsService);

  posts: Post[] = [];

  ngOnInit(): void {
    this.getAllPosts();
  }


  getAllPosts()
  {
    this.postsService.getSavedPosts().subscribe({
      next : (res)=> {
        console.log(res)
        this.posts = res.data.bookmarks
      },
      error : (err) => {
        console.log(err)
      },
      complete : ()=> {
        this.posts = this.postActionsService.normalizePostsLikes(this.posts);
      }
    })
  }

  toggleLike(post: Post): void {
    this.postActionsService.toggleLike(post).subscribe({
      error: (err) => console.log(err),
    });
  }

  toggleSave(post: Post): void {
    this.postActionsService.toggleSave(post).subscribe({
      error: (err) => console.log(err),
    });
  }
}
