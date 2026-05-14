import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject , debounceTime, distinctUntilChanged, takeUntil} from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { Suggestions } from '../../core/models/suggestions.interface';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SuggestionCardComponent } from './suggestion-card/suggestion-card.component';

@Component({
  selector: 'app-suggestions',
  imports: [RouterLink, SuggestionCardComponent, FormsModule],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent  implements OnInit, OnDestroy  {

  private readonly usersService = inject(UsersService);
  private readonly destroy$ = new Subject<void>();
  private readonly searchSubject = new Subject<string>();
  
  friends: Suggestions[] = [];
  total = signal(0);
  isLoading = signal(false);
  isLoadingMore = signal(false);
  searchQuery = '';
  private currentLimit = 20;
  ngOnInit(): void {
    this.loadSuggestions();
    this.listenToSearch();
  }

  listenToSearch(): void {
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((q) => {
        this.currentLimit = 20;
        this.loadSuggestions(q);
      });
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  loadSuggestions(q: string = this.searchQuery): void {
    this.isLoading.set(true);
    this.usersService
      .getAllSuggestions(1, this.currentLimit, q)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.friends = res.data.suggestions;
          this.total.set(res.meta.pagination.total);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
        },
      });
  }

  loadMore(): void {
    this.currentLimit += 20;
    this.isLoadingMore.set(true);
    this.usersService
      .getAllSuggestions(1, this.currentLimit, this.searchQuery)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.friends = res.data.suggestions;
          this.total.set(res.meta.pagination.total);
          this.isLoadingMore.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLoadingMore.set(false);
        },
      });
  }

  onFriendFollowed(friendId: string): void {
    this.usersService
      .follow_unFollowUser(friendId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err) => console.log(err),
        complete: () => {
          this.friends = this.friends.filter((f) => f._id !== friendId);
          this.total.update((v) => v - 1);
        },
      });
  }

  get hasMore(): boolean {
    return this.friends.length < this.total();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
