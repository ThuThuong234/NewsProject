import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {FeedbackService} from "../../services/feedback.service";
import {TypeService} from "../../services/type.service";
import {NewsTypePaging} from "../../view-models/newstype/newstype-paging";
import {plainToClass} from "class-transformer";
import {FeedbackPaging} from "../../view-models/feedbacks/feedback-paging";
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-news-type',
  templateUrl: './news-type.component.html',
  styleUrls: ['./news-type.component.css']
})
export class NewsTypeComponent implements OnInit {
  typePaging: NewsTypePaging = new NewsTypePaging();

  constructor(private router: Router,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private typeService: TypeService,
              private authService : AuthenticateService,) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('News'));
    this.getTypes();
  }

  private getTypes() {
    this.typeService.getNewsTypes().subscribe(res => {
        if (res.success && res.data) {
          console.log(res.data);
          this.typePaging = plainToClass(NewsTypePaging, res.data);
        } else {
          this.toastr.error(" res is not succeeds" + res.message);
        }
      },
      error => {
        this.toastr.error("error while get news" + this.translate.instant('COMMON.GET.FAILED'));
      })
  }

  viewDetail(id){
    this.router.navigate(['/news',id]);
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
