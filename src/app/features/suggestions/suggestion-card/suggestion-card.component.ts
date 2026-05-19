import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suggestions } from '../../../core/models/suggestions.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-suggestion-card',
  imports: [RouterLink],
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
