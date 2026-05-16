import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { ProfileComponent } from './features/profile/profile.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { FeedComponent } from './features/feed/pages/feed/feed.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { authGuard } from './core/auth/gaurds/auth-guard';
import { userGuard } from './core/auth/gaurds/user-guard';
import { MyPostsComponent } from './features/feed/pages/my-posts/my-posts.component';
import { CommunityPostsComponent } from './features/feed/pages/community-posts/community-posts.component';
import { SavedPostsComponent } from './features/feed/pages/saved-posts/saved-posts.component';
import { FeedLayoutComponent } from './layouts/feed-layout/feed-layout.component';
import { SuggestionsComponent } from './features/suggestions/suggestions.component';
import { SinglePostComponent } from './features/single-post/single-post.component';

export const routes: Routes = [
    {path:"",redirectTo:'login',pathMatch:'full'},
    {path:"",component:AuthLayoutComponent,canActivate:[userGuard],children:[
        {path:"login",component:LoginComponent,title:"Login"},
        {path:"register",component:RegisterComponent,title:"Register"},
        {path:"forgot-password",component:ForgotPasswordComponent,title:"Forgot Password"},

    ]},
    {
        path: '',
        component: MainLayoutComponent,
        children: [     
          {
            path: 'feed', component: FeedLayoutComponent,
            children: [
              { path: '', component: FeedComponent , title : 'Feed' },
              { path: 'community', component: CommunityPostsComponent , title : 'Community'},
              { path: 'saved', component: SavedPostsComponent , title : 'Saved Posts'},
              { path:'my-posts',component:MyPostsComponent,title:'My Posts'}
            ]
          },     
          { path: 'profile', component: ProfileComponent, title: 'Profile Page' },
          { path: 'profile/:id', component: ProfileComponent, title: 'Profile Page' },
          { path: 'change-password',component : ChangePasswordComponent , title : 'Forget Password Page' },
          { path: 'notification',component : NotificationComponent , title : 'Notification Page' },
          { path: 'suggestions',component : SuggestionsComponent , title : 'Suggestions Page' },
          { path: 'posts/:id', component: SinglePostComponent, title: 'Post' }
        ]
      },
    {path:"**",component:NotfoundComponent,title:"Not Found"},
];
