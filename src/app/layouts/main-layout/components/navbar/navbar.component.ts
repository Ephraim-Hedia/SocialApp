import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { NotificationStateService } from '../../../../core/services/notification-state.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  
  private router = inject(Router)
  private authService = inject(AuthService)
  readonly notificationState = inject(NotificationStateService);

  
  isMenuOpen:boolean = false
  userData = JSON.parse(localStorage.getItem('user') || '{}');

  ngOnInit(): void {
    // Start global polling when navbar loads
    // Navbar is always present when logged in → perfect place to start
    this.notificationState.startPolling();
  }

  
  logOut(): void {
    this.notificationState.stopPolling();
    this.authService.signOut();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
