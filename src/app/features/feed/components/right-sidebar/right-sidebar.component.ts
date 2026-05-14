import { Component, inject, OnInit, signal } from '@angular/core';
import { Friend, FriendCardComponent } from './friend-card/friend-card.component';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { Suggestions } from '../../../../core/models/suggestions.interface';

@Component({
  selector: 'app-right-sidebar',
  imports: [FriendCardComponent,RouterLink],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css',
})
export class RightSidebarComponent implements OnInit {

  private readonly usersService = inject(UsersService)
  ngOnInit(): void {
    this.getFollowers()
  }

  getFollowers():void {
    this.usersService.getFollowSugguestions().subscribe({
      next : (res)=>{
        console.log(res)
        this.friends = res.data.suggestions
      },
      error : (err)=>{
        console.log(err)
      },
      complete : ()=>{

      }
    })
  }
  isExpanded = signal(false);
  friends: Suggestions[] = []

  toggleExpanded(): void {
    this.isExpanded.update(v => !v);
  }
  onFriendFollowed(friendId: string): void {
    this.usersService.follow_unFollowUser(friendId).subscribe({
      next :(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.friends = this.friends.filter(f => f._id !== friendId);
        this.getFollowers()
      }
    })

  }
}
