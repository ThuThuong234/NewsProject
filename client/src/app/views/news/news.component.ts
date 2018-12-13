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
import {AuthService} from "angular-6-social-login";
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsPaging: NewsPaging;
  dataEdit : News;
  news : News = new News();
  subscription: Subscription;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('editModal') editNewsModal: ModalDirective;

  constructor(private router: Router,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private newsService: NewsService,
              private authService : AuthenticateService,
              ) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('News'));
    this.getNewsList();
  }

  getNewsList() {
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

  getNews(id) {
    this.newsService.getNews(id).subscribe(
      res => {
        if (res.success && res.data) {
          console.log(res.data);
          this.newsPaging = plainToClass(NewsPaging, res.data);
          this.news = this.newsPaging[0];
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
      this.getNewsList();
    });
  }
  openEditNewsModal(news_id :number) {
    this.getNews(news_id);
    this.editNewsModal.show();
  }
  updateNews() {
    console.log(sessionStorage.getItem("currentInsertNews"));
    this.news.content = sessionStorage.getItem("currentInsertNews");
    this.newsService.updateNews(this.news.news_id, this.news).subscribe(result => {
      this.closeEditNewsModal();
      this.toastr.success('Updated successfully', 'News');
      this.getNewsList();
    });
  }
  closeEditNewsModal() {
    this.editNewsModal.hide();
    this.news = null;
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
