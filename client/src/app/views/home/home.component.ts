import {Component, ModuleWithProviders, OnInit} from '@angular/core';
import {deserialize, plainToClass} from "class-transformer";
import {NewsPaging} from "../../view-models/news/news-paging";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
// import {BsModalService} from "ngx-bootstrap/modal";
// import { BsModalRef } from 'ngx-bootstrap/modal';
import {NewsService} from "../../services/news.service";
import {Observable, Subscription} from "rxjs";
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FormGroup} from "@angular/forms";
import {News} from "../../view-models/news/news";
import {NewsType} from "../../view-models/newstype/newstype";
import {TypeService} from "../../services/type.service";
import {NewsTypePaging} from "../../view-models/newstype/newstype-paging";
import {SessionVM} from "../../view-models/session/session-vm";
import {Feedback} from "../../view-models/feedbacks/feedback";
import {FeedbackService} from "../../services/feedback.service";
// import {AuthService, GoogleLoginProvider} from "angular-6-social-login";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  session: SessionVM;
  email_feedback : string;
  newsPaging : NewsPaging;
  newsFirst : News;
  newstypes : NewsTypePaging;
  feedback : Feedback = new Feedback();
  message_insert_feedback : string;

  keywords = '';
  // bsModalRef: BsModalRef;
  $timer: Observable<number>;
  subscription: Subscription;

  constructor(private router: Router,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              // private modalService: BsModalService,
              private newsService: NewsService,
              private newsTypesService : TypeService,
              private feedbackService : FeedbackService,
              // private socialAuthService: AuthService,
              ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.getNews();
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {

      this.session = deserialize(SessionVM, currentUser);
      if (this.session) {
        this.email_feedback = this.session.username;
      }

    }
  }
  onLogin(){
    this.router.navigate(['/login']);
  }

  getNews(){
    this.newsService.getLatestNews().subscribe(
      res =>{
        if (res.success && res.data) {
          console.log(res.data);
          this.newsPaging = plainToClass(NewsPaging, res.data);
          this.newsFirst = this.newsPaging.Items[0];
        } else {
          this.toastr.error(" res is not succeeds" +res.message);
        }
      },
      error => {
        this.toastr.error("error while get news" + this.translate.instant('COMMON.GET.FAILED'));
      })
  }
  getTypes(id :number){

    this.router.navigate(['/types/',id]);
  }
  sendFeedBack(){
    this.feedback.posted_date = new Date();
    this.feedback.email = sessionStorage.getItem("reader_email");
    this.feedbackService.createFeedback(this.feedback).subscribe(
      res =>{

        this.message_insert_feedback= "success";
      },
      error => {
        this.message_insert_feedback = "failed";
      });
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomeComponent,
      providers: [TranslateService]
    };
  }
}
