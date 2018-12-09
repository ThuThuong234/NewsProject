import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import {AppRoutingModule,routingCoponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BsDropdownModule, BsModalService} from "ngx-bootstrap";

import {FormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import {
//   SocialLoginModule,
//   AuthServiceConfig,
//   GoogleLoginProvider,
//   FacebookLoginProvider,
// } from "angular-6-social-login";

// import services

import { FeedbackService } from './services/feedback.service';
import { NewsService } from './services/news.service';
import { UserService } from './services/user.service';
import { TypeService } from './services/type.service';
import { AuthenticateService } from './services/authenticate.service';
// import { FeedbackService } from './services/feedback.service';
import { SpinService } from './services/spin.service';
import { CreateNewsComponent } from './views/news/create-news/create-news.component';
import { HomeComponent } from './views/home/home.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// export function getAuthServiceConfigs() {
//   let config = new AuthServiceConfig(
//     [
//       {
//         id: GoogleLoginProvider.PROVIDER_ID,
//         provider: new GoogleLoginProvider("693015107956-568jk2nqalaqs5tmdiv6irq3hteut3nl.apps.googleusercontent.com")
//       },
//     ]
// );
//   return config;
// }
@NgModule({
  declarations: [
    AppComponent,
    routingCoponents,
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
    // SocialLoginModule,
  ],
  providers: [
    FeedbackService,
    NewsService,
    UserService,
    SpinService,
    TypeService,
    AuthenticateService,
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: getAuthServiceConfigs
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
