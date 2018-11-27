import { Component, OnInit } from '@angular/core';
import {plainToClass} from "class-transformer";
import {NewsPaging} from "./view-models/news/news-paging";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NewsService} from "./services/news.service";
import {Observable, Subscription} from "rxjs";
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  list_news = [];
  news = {};
  searchForm: FormGroup;
  private selectedNewsId;
  private selectedTypeId;
  private currentPage = 1;
  private pageSize = 10;
  FIRST_PAGE = 1;
  newsPaging: NewsPaging;
  keywords = '';
  // bsModalRef: BsModalRef;
  // $timer: Observable<number>;
  // subscription: Subscription;

  constructor(private router: Router, translate: TranslateService, private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private modalService: BsModalService,
              private newsService: NewsService,) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });
    this.getNews();
  }

  getNews(newPage = 1){
    this.newsService.getLatestNews(newPage).subscribe(
      res =>{
        if (res.success && res.data) {
          this.newsPaging = plainToClass(NewsPaging, res.data);
        } else {
          this.toastr.error(res.message);
        }
      },
      error => {
        this.toastr.error(this.translate.instant('COMMON.GET.FAILED'));
      })
  }

}
