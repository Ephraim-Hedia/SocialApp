import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suggestions } from '../../../core/models/suggestions.interface';

@Component({
  selector: 'app-suggestion-card',
  imports: [],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.css',
})
export class SuggestionCardComponent {
  @Input() friend!: Suggestions;
  @Output() followClicked = new EventEmitter<string>();

  onFollow(): void {
    this.followClicked.emit(this.friend._id);
  }
}
