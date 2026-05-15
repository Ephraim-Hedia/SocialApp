import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationsService } from '../../../app/core/services/notifications.service';
import { NotificationStateService } from '../../core/services/notification-state.service';
import { Notification } from '../../core/models/notification.interface';

import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';

type NotifTab = 'all' | 'unread';
@Component({
  selector: 'app-notification',
  imports: [RouterLink,TimeAgoPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit{
  private readonly notificationsService = inject(NotificationsService);
  private readonly notificationState = inject(NotificationStateService);

  notifications = signal<Notification[]>([]);
  activeTab = signal<NotifTab>('all');
  isLoading = signal(false);
  isLoadingMore = signal(false);
  isMarkingAll = signal(false);
  unreadCount = this.notificationState.unreadCount;

  private currentPage = 1;
  private readonly limit = 10;
  hasMore = signal(false);

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.isLoading.set(true);
    this.currentPage = 1;
    const isUnread = this.activeTab() === 'unread' ;

    this.notificationsService
      .getNotification(isUnread  , this.currentPage, this.limit)
      .subscribe({
        next: (res) => {
          this.notifications.set(res.data.notifications);
          this.hasMore.set(
            res.meta.pagination.currentPage < res.meta.pagination.numberOfPages
          );
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
        },
      });
  }

  loadMore(): void {
    this.isLoadingMore.set(true);
    this.currentPage++;
    const isUnread = this.activeTab() === 'unread';

    this.notificationsService
      .getNotification(isUnread, this.currentPage, this.limit)
      .subscribe({
        next: (res) => {
          this.notifications.update(list => [
            ...list,
            ...res.data.notifications,
          ]);
          this.hasMore.set(
            res.meta.pagination.currentPage < res.meta.pagination.numberOfPages
          );
          this.isLoadingMore.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLoadingMore.set(false);
        },
      });
  }

  onTabChange(tab: NotifTab): void {
    this.activeTab.set(tab);
    this.loadNotifications();
  }

  markAsRead(notification: Notification): void {
    if (notification.isRead) return;

    this.notificationsService
      .markNotificationAsRead(notification._id)
      .subscribe({
        next: () => {
          // Update locally — no re-fetch needed
          this.notifications.update(list =>
            list.map(n =>
              n._id === notification._id ? { ...n, isRead: true } : n
            )
          );
          this.notificationState.decrementCount();
        },
        error: (err) => console.log(err),
      });
  }

  markAllAsRead(): void {
    this.isMarkingAll.set(true);
    this.notificationsService.markAllNotificationAsRead().subscribe({
      next: () => {
        this.notifications.update(list =>
          list.map(n => ({ ...n, isRead: true }))
        );
        this.notificationState.resetCount();
        this.isMarkingAll.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isMarkingAll.set(false);
      },
    });
  }

  // ─── HELPERS ──────────────────────────────────────────────

  getNotifIcon(type: string): string {
    const icons: Record<string, string> = {
      like:    'fa-solid fa-thumbs-up text-blue-500',
      comment: 'fa-solid fa-comment text-green-500',
      share:   'fa-solid fa-share-nodes text-purple-500',
      follow:  'fa-solid fa-user-plus text-mainColor',
    };
    return icons[type] ?? 'fa-solid fa-bell text-gray-400';
  }

  getNotifMessage(type: string): string {
    const messages: Record<string, string> = {
      like:    'liked your post',
      comment: 'commented on your post',
      share:   'shared your post',
      follow:  'started following you',
    };
    return messages[type] ?? '';
  }


}
