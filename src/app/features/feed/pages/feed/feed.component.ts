import { Component, effect, inject, OnInit } from '@angular/core';

import { Post } from '../../../../core/models/post.interface';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostsService } from '../../../../core/services/posts.service';
import { PostStateService } from '../../../../core/services/post-state.service';

@Component({
  selector: 'app-feed',
  imports: [PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {

  private readonly postsService = inject(PostsService)
  private readonly postStateService = inject(PostStateService);

  posts: Post[] = []

  constructor() {
    // React to new posts from the layout
    effect(() => {
      const newPost = this.postStateService.newPost();
      if (newPost) {
        this.posts.unshift(newPost);
        this.postStateService.clearNewPost();
      }
    });
  }
  
  ngOnInit(): void {
    this.getAllPosts()
  }
  
  getAllPosts():void {
    this.postsService.getHomeFeedPosts().subscribe(
      {
        next : (res)=>{
          console.log(res)
          this.posts = res.data.posts
        },
        error : (err)=>{
          console.log(err)
        }, 
        complete : ()=>{
          const userData = localStorage.getItem('user');
          if (userData) {
            const currentUser = JSON.parse(userData);
  
            this.posts.forEach(post => {
              post.isLiked = post.likes.includes(currentUser._id);
            });
          }
        }
      }
    )
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
