import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-community-posts',
  imports: [PostCardComponent],
  templateUrl: './community-posts.component.html',
  styleUrl: './community-posts.component.css',
})
export class CommunityPostsComponent implements OnInit {
  
  posts : Post[] = []
  postsService = inject(PostsService)
  ngOnInit(): void {
    this.getAllPosts()
  }

  getAllPosts()
  {
    this.postsService.getAllPosts().subscribe({
      next : (res)=> {
        console.log(res)
        this.posts = res.data.posts
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
