# 🌐 Route Posts — Social Media App

> A full-featured social media web application built with Angular 21 and Tailwind CSS v4.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://ephraim-hedia.github.io/SocialApp/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Ephraim-Hedia/SocialApp)

---

## 🚀 Live Demo

🔗 [https://ephraim-hedia.github.io/SocialApp/](https://ephraim-hedia.github.io/SocialApp/)

---

## 📋 About The Project

**Route Posts** is a modern social media platform where users can connect, share posts, follow friends, and interact through likes, comments, and shares. Built as a frontend project to demonstrate real-world Angular skills including state management, reactive programming, component architecture, and API integration.

---

## ✨ Features

### 🔐 Authentication
- User registration with full validation
- Login with email or username
- Change password
- Auth guards to protect private routes
- Token-based authentication via HTTP interceptor

### 📰 Feed
- Home feed showing posts from followed users
- Community feed showing all public posts
- My Posts page
- Saved/Bookmarked posts page
- Create post with image upload, privacy settings, and emoji picker
- Real-time post prepending after creation (no page refresh)

### 📝 Posts
- Like / Unlike posts
- Save / Unsave posts
- Share posts
- View single post details
- Delete own posts
- Image preview with lightbox

### 💬 Comments & Replies
- View top comment preview on feed
- Expand full comments section
- Add comments with image and emoji support
- Reply to comments
- Like comments (optimistic update)
- Delete own comments and replies

### 👤 Profile
- My profile page with cover and avatar
- Upload / Change / Remove cover photo
- Upload / Change profile photo
- Followers, Following, Bookmarks stats
- My Posts count and Saved Posts count
- Tab switching between My Posts and Saved Posts
- Friend profile page with Follow / Unfollow button

### 🔔 Notifications
- Real-time unread count badge on navbar (polling every 60s)
- All / Unread tab filtering
- Mark single notification as read
- Mark all notifications as read
- Load more pagination
- Navigate to related post from notification

### 👥 Suggestions
- Suggested friends sidebar (desktop + mobile accordion)
- Full suggestions page with search
- Load more pagination
- Mutual followers badge
- Follow removes card instantly

### 🔧 Technical Features
- Angular 21 standalone components
- Signals for reactive state management
- HTTP interceptors (Auth token, Error handling, Loading spinner)
- `ngx-toastr` for toast notifications
- `ngx-spinner` for global loading indicator
- `PostActionsService` for shared like/save logic
- `PostStateService` for cross-component new post broadcasting
- `NotificationStateService` for global unread count polling
- `TimeAgoPipe` shared pipe for date formatting
- Responsive design (mobile + desktop)
- Hash-based routing for GitHub Pages compatibility

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Angular 21 |
| Styling | Tailwind CSS v4.1 |
| UI Components | Flowbite |
| Icons | Font Awesome Free |
| HTTP Client | Angular HttpClient |
| Reactive Programming | RxJS |
| State Management | Angular Signals |
| Toast Notifications | ngx-toastr |
| Loading Spinner | ngx-spinner |
| Routing | Angular Router (Hash Location) |
| Forms | Reactive Forms + Template-driven Forms |
| Build Tool | Angular CLI |
| Deployment | GitHub Pages via angular-cli-ghpages |

---

## 🏗️ Project Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── guards/         # authGuard, userGuard
│   │   │   └── services/       # AuthService
│   │   ├── interceptors/       # auth, error, loading interceptors
│   │   ├── models/             # TypeScript interfaces
│   │   └── services/           # Shared services (Posts, Users, Comments...)
│   ├── features/
│   │   ├── feed/
│   │   │   ├── components/     # create-post, post-card, sidebars...
│   │   │   └── pages/          # feed, my-posts, community, saved
│   │   ├── profile/            # Profile page (my + friend)
│   │   ├── notification/       # Notifications page
│   │   ├── suggestions/        # Suggestions page + card
│   │   ├── single-post/        # Single post page
│   │   ├── login/
│   │   ├── register/
│   │   └── change-password/
│   ├── layouts/
│   │   ├── auth-layout/        # Login / Register layout
│   │   ├── main-layout/        # Navbar + router-outlet
│   │   └── feed-layout/        # Left sidebar + Right sidebar + Create post
│   └── shared/
│       ├── pipes/              # TimeAgoPipe
│       └── validation/         # ValidationService, validation messages
```

---

## 📱 Responsive Design

| Screen | Layout |
|---|---|
| Desktop (lg+) | 3-column grid: Left sidebar + Feed + Right sidebar |
| Mobile | Stacked: Mobile menu + Suggestions accordion + Feed |

---

## 🔗 Contact

**Ephraim Hedia**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ephraim-hedia)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Ephraim-Hedia)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by [Ephraim Hedia](https://github.com/Ephraim-Hedia) — Route Academy Frontend Track
