import {Component, OnInit, ViewChild} from '@angular/core';
import {News} from '../../view-models/news/news';
import {NewsService} from "../../services/news.service";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {NewsPaging} from "../../view-models/news/news-paging";
import {Observable, Subscription} from "rxjs";
import {plainToClass} from "class-transformer";
import {Router} from "@angular/router";
import { ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsPaging: NewsPaging;
  news : News = new News();
  subscription: Subscription;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(private router: Router,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private newsService: NewsService,
              ) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('News'));
    this.getNews();
  }

  getNews() {
    this.newsService.getNewsList().subscribe(
      res => {
        if (res.success && res.data) {
          console.log(res.data);
          this.newsPaging = plainToClass(NewsPaging, res.data);
        } else {
          this.toastr.error(" res is not succeeds" + res.message);
        }
      },
      error => {
        this.toastr.error("error while get news" + this.translate.instant('COMMON.GET.FAILED'));
      })
  }

  createNews() {

    this.router.navigate(['/admin/news/create']);
  }

  openModaldeleteItem(news_id) {
    if (news_id) {
      this.news.news_id = news_id;
      this.deleteModal.show();
    }
  }
  closeDeleteModal() {
    this.deleteModal.hide();
  }
  deleteNews(id) {
    this.newsService.deleteNews(id).subscribe(result => {
      this.closeDeleteModal();
      this.toastr.success('Deleted successfully', 'News');
      this.getNews();
    });
  }

}
