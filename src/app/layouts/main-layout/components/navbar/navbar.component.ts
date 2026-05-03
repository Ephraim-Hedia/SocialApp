import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  
  private router = inject(Router)
  private authService = inject(AuthService)
  isMenuOpen:boolean = false

  logOut()
  {
    this.authService.signOut()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
