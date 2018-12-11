import {Component, OnInit} from '@angular/core';
import {News} from '../../view-models/news/news';
import {NewsService} from "../../services/news.service";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {NewsPaging} from "../../view-models/news/news-paging";
import {Observable, Subscription} from "rxjs";
import {plainToClass} from "class-transformer";
import {Router} from "@angular/router";
// import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ConfirmComponent} from "../shared/confirm/confirm.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsPaging: NewsPaging;
  subscription: Subscription;
  // bsModalRef: BsModalRef;

  constructor(private router: Router,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private newsService: NewsService,
              // private modalService: BsModalService,
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

  deleteItem(news_id) {
    // if (news_id) {
    //   const initialState = {
    //     title: this.translate.instant('COMMON.TITLE.CONFIRM'),
    //     content: this.translate.instant('COMMON.TEXT.DELETE')
    //   };
    //   this.bsModalRef = this.modalService.show(ConfirmComponent, {initialState});
    //   this.bsModalRef.content.onClose.subscribe(del => {
    //     if (del) {
    //       this.newsService.deleteNews(news_id).subscribe(
    //         res => {
    //           if (res.success) {
    //             // this.toastr.success(this.translate.instant('COMMON.DELETE.SUCCESS'));
    //             // this.getFeedbacks(this.feedbackPaging.current_page);
    //             // this.dataChanged.emit(true);
    //           } else {
    //             this.toastr.error(res.message);
    //           }
    //         },
    //         error => {
    //           this.toastr.error(this.translate.instant('COMMON.DELETE.FAILED'));
    //         });
    //     }
    //   });
    // }
    // this.newsService.deleteNews(news_id).subscribe();
  }


}
