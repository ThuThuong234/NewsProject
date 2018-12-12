import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ModalModule} from "ngx-bootstrap";

import {AppRoutingModule,routingCoponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BsDropdownModule, BsModalService} from "ngx-bootstrap";

import {FormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import services

import { FeedbackService } from './services/feedback.service';
import { NewsService } from './services/news.service';
import { UserService } from './services/user.service';
import { TypeService } from './services/type.service';
import { AuthenticateService } from './services/authenticate.service';

import { SpinService } from './services/spin.service';
import { TypeDetailsComponent } from './views/type-details/type-details.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    routingCoponents,
    TypeDetailsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
    BrowserAnimationsModule,

    ModalModule.forRoot(),
  ],
  providers: [
    FeedbackService,
    NewsService,
    UserService,
    SpinService,
    TypeService,
    AuthenticateService
  ],
  bootstrap: [AppComponent],
 

})
export class AppModule {
}
