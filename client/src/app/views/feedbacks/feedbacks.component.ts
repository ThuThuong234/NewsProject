import { Component, OnInit } from '@angular/core';
import {FeedbackPaging} from "../../view-models/feedbacks/feedback-paging";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {NewsService} from "../../services/news.service";
import {AuthenticateService} from "../../services/authenticate.service";
import {FeedbackService} from "../../services/feedback.service";
import {plainToClass} from "class-transformer";
import {NewsPaging} from "../../view-models/news/news-paging";

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  feedbackPaginng : FeedbackPaging = new FeedbackPaging();
  constructor(private router: Router,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private feedbackService: FeedbackService,
              private authService : AuthenticateService,) { }

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('Feedbacks'));
    this.getFeedbacks();
  }

  private getFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(res => {
        if (res.success && res.data) {
          console.log(res.data);
          this.feedbackPaginng= plainToClass(FeedbackPaging, res.data);
        } else {
          this.toastr.error(" res is not succeeds" + res.message);
        }
      },
      error => {
        this.toastr.error("error while get news" + this.translate.instant('COMMON.GET.FAILED'));
      })
  }

  viewDetail(id){
    this.router.navigate(['/admin.feedbacks',id]);
  }
  doLogout(){
    this.authService.clearSession();
    this.router.navigate(['/']);
  }
  navigateNews(){

    this.router.navigate(['/admin/news']);
  }
  navigateTypes(){

    this.router.navigate(['/admin/types']);
  }
  navigateFeedbacks(){

    this.router.navigate(['/admin/feedbacks']);
  }
}
