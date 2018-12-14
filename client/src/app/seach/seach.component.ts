import { Component, OnInit } from '@angular/core';
import {NewsPaging} from "../view-models/news/news-paging";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {NewsService} from "../services/news.service";
import {TypeService} from "../services/type.service";
import {FeedbackService} from "../services/feedback.service";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'app-seach',
  templateUrl: './seach.component.html',
  styleUrls: ['./seach.component.css']
})
export class SeachComponent implements OnInit {

  searchPaging: NewsPaging;
  constructor(private router: Router,
              private route : ActivatedRoute,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private newsService: NewsService,
              private newsTypesService: TypeService,
              private feedbackService: FeedbackService,) { }

  ngOnInit() {
    let title =this.route.snapshot.paramMap.get('title');
    this.getNews(title);
  }

  getNews(title: String) {
  this.newsService.search(title).subscribe(res => {
      this.searchPaging = plainToClass(NewsPaging,res.data);
      console.log(res.data);
    },
    error => {
      this.toastr.error("error while get news" + this.translate.instant('COMMON.GET.FAILED'));
    })
  }
  navigate(news_id) {
    this.router.navigate(['/news', news_id]);
  }

  getTypes(id: number) {

    this.router.navigate(['/types/', id]);
  }
}
