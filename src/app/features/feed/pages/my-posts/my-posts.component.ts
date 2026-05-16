import { Component, inject } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostActionsService } from '../../../../core/services/post-actions.service';

@Component({
  selector: 'app-my-posts',
  imports: [PostCardComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent {
  
  private readonly postsService = inject(PostsService)
  private readonly postActionsService = inject(PostActionsService)
  posts: Post[] = []

  ngOnInit(): void {
    this.getMyPosts()
  }
  
  getMyPosts():void {
    this.postsService.getMyPosts().subscribe(
      {
        next : (res)=>{
          console.log(res)
          this.posts = res.data.posts
        },
        error : (err)=>{
          console.log(err)
        },
        complete : ()=>{
          this.posts = this.postActionsService.normalizePostsLikes(this.posts);
        }
      }
    )
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
