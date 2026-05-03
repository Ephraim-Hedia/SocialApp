import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { ProfileComponent } from './features/profile/profile.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { FeedComponent } from './features/feed/feed.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { authGuard } from './core/auth/gaurds/auth-guard';
import { userGuard } from './core/auth/gaurds/user-guard';

export const routes: Routes = [
    {path:"",redirectTo:'login',pathMatch:'full'},
    {path:"",component:AuthLayoutComponent,canActivate:[userGuard],children:[
        {path:"login",component:LoginComponent,title:"Login"},
        {path:"register",component:RegisterComponent,title:"Register"},
        {path:"forgot-password",component:ForgotPasswordComponent,title:"Forgot Password"},

    ]},
    {path:"",component:MainLayoutComponent, canActivate:[authGuard],children:[
        {path:"profile",component:ProfileComponent,title:"Profile"},
        {path:"feed",component:FeedComponent,title:"Feed"},
        {path:"notification",component:NotificationComponent,title:"Notification"},
        {path:"change-password",component:ChangePasswordComponent,title:"Change Password"}
    ]},
    {path:"**",component:NotfoundComponent,title:"Not Found"},
];
