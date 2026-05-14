import { Component, inject } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-my-posts',
  imports: [PostCardComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent {
  
  private readonly postsService = inject(PostsService)

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

        }
      }
    )
  }

  toggleLike(post: Post) {
    post.likesCount++; 
  }
  
  toggleSave(post: Post) {
    post.bookmarked = !post.bookmarked;
  }
}
