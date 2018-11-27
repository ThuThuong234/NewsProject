import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './views/login/login.component';
import {NewsComponent} from './views/news/news.component';
import {UsersComponent} from './views/users/users.component';
import {NewsTypeComponent} from './views/news-type/news-type.component';
import {FeedbacksComponent} from './views/feedbacks/feedbacks.component';
import {CommentsComponent} from './views/comments/comments.component';
import {DefaultAdminLayoutComponent} from './containers/default-admin-layout/default-admin-layout.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BsDropdownModule, BsModalService} from "ngx-bootstrap";

// import services

import { FeedbackService } from './services/feedback.service';
import { NewsService } from './services/news.service';
import { UserService } from './services/user.service';
// import { FeedbackService } from './services/feedback.service';
// import { FeedbackService } from './services/feedback.service';
import { SpinService } from './services/spin.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true,
      preventDuplicates: true,
    }),
    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory ,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    FeedbackService,
    NewsService,
    UserService,
    SpinService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
