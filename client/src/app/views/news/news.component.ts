import { Component, OnInit } from '@angular/core';
import {News} from '../../view-models/news/news';
import {NewsService} from "../../services/news.service";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
// import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NewsPaging} from "../../view-models/news/news-paging";
import {Observable, Subscription} from "rxjs";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  // news:News = {
  //   username: "string";
  // type_id: 1;
  // title: "string";
  // content: "string";
  // image: ["dfsd"];
  // postdate: new Date()
  // }

  newsPaging: NewsPaging;
  keywords = '';
  // bsModalRef: BsModalRef;
  $timer: Observable<number>;
  subscription: Subscription;

  constructor(
    private titleService: Title,
    private toastr: ToastrService,
    private translate: TranslateService,
    // private modalService: BsModalService,
    private newsService: NewsService,) {}

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('PAGES.TITLE.NEWS.INDEX'));
    this.getNews();
  }

  getNews(newPage = 1){
    this.newsService.getNewsList().subscribe(
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
