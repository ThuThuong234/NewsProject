import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './views/login/login.component';
import {NewsComponent} from './views/news/news.component';
import {UsersComponent} from './views/users/users.component';
import {NewsTypeComponent} from './views/news-type/news-type.component';
import {FeedbacksComponent} from './views/feedbacks/feedbacks.component';
import {CommentsComponent} from './views/comments/comments.component';
import {DefaultAdminLayoutComponent} from './containers/default-admin-layout/default-admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    LoginComponent,
    DefaultAdminLayoutComponent,
    P404Component,
    P500Component,
    UsersComponent,
    NewsTypeComponent,
    FeedbacksComponent,
    CommentsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
