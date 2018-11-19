import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './views/news/news.component';
import { LoginComponent } from './views/login/login.component';
import { DefaultAdminLayoutComponent } from './containers/default-admin-layout/default-admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    LoginComponent,
    DefaultAdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
