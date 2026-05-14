import { Component, inject } from '@angular/core';
import { Post } from '../../../../core/models/post.interface';
import { PostsService } from '../../../../core/services/posts.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-saved-posts',
  imports: [PostCardComponent],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css',
})
export class SavedPostsComponent {
  posts : Post[] = []
  postsService = inject(PostsService)
  ngOnInit(): void {
    this.getAllPosts()
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
        const userData = localStorage.getItem('user');

        if (userData) {
          const currentUser = JSON.parse(userData);

          this.posts.forEach(post => {
            post.isLiked = post.likes.includes(currentUser._id);
          });
        }
      }
    })
  }

  toggleLike(post: Post) {
    this.postsService.like_unlikePost(post._id).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.data.liked == true)
        {
          post.likesCount++; 
          post.isLiked = true
        }
        else if (res.data.liked == false){
          post.likesCount--; 
          post.isLiked = false
        }
      },
      error : (err)=>{
        console.log(err)
      },
      complete : ()=>{

      }
    })

  }
  
  toggleSave(post: Post) {
    this.postsService.bookmark_Unbookmark(post._id).subscribe({
      next :(res)=> {
        console.log(res)
      },
      error : (err) => {
        console.log(err)
      },
      complete : ()=>{
        post.bookmarked = ! post.bookmarked
      }
    })
  }
}
