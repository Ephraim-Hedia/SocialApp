import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suggestions } from '../../../../../core/models/suggestions.interface';
export interface Friend {
  id: number;
  name: string;
  username: string;
  followers: number;
  profileImage: string;
}

@Component({
  selector: 'app-friend-card',
  imports: [],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css',
})
export class FriendCardComponent {
  @Input() friend!: Suggestions;
  @Output() followClicked = new EventEmitter<string>();

  onFollow(): void {
    this.followClicked.emit(this.friend._id);
  }
}
