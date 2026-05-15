import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { interval, Subscription, switchMap } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationStateService {
  private readonly notificationsService = inject(NotificationsService);

  // Global unread count signal — navbar + notification page both read this
  readonly unreadCount = signal<number>(0);

  private pollSubscription: Subscription | null = null;

  startPolling(): void {
    // Avoid duplicate polling if already started
    if (this.pollSubscription) return;

    // Fetch immediately on start
    this.fetchCount();

    // Then fetch every 60 seconds
    this.pollSubscription = interval(60000)
      .pipe(switchMap(() => this.notificationsService.getNotificationCount()))
      .subscribe({
        next: (res) => this.unreadCount.set(res.data.unreadCount),
        error: (err) => console.log(err),
      });
  }

  stopPolling(): void {
    this.pollSubscription?.unsubscribe();
    this.pollSubscription = null;
  }

  fetchCount(): void {
    this.notificationsService.getNotificationCount().subscribe({
      next: (res) => this.unreadCount.set(res.data.unreadCount),
      error: (err) => console.log(err),
    });
  }

  decrementCount(by: number = 1): void {
    this.unreadCount.update(v => Math.max(0, v - by));
  }

  resetCount(): void {
    this.unreadCount.set(0);
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }
}
