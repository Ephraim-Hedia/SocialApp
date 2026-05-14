import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {
  menuItems = [
    {
      title: 'Feed',
      icon: 'fa-regular fa-newspaper',
      route: '/feed'
    },
    {
      title: 'My Posts',
      icon: 'fa-solid fa-code-branch',
      route: '/feed/my-posts'
    },
    {
      title: 'Community',
      icon: 'fa-regular fa-circle-nodes',
      route: '/feed/community'
    },
    {
      title: 'Saved',
      icon: 'fa-regular fa-bookmark',
      route: '/feed/saved'
    }
  ];
}
