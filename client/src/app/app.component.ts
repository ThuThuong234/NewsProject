import {Component, ModuleWithProviders, OnInit} from '@angular/core';
import {plainToClass} from "class-transformer";
import {NewsPaging} from "./view-models/news/news-paging";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
// import {BsModalService} from "ngx-bootstrap/modal";
// import { BsModalRef } from 'ngx-bootstrap/modal';
import {NewsService} from "./services/news.service";
import {Observable, Subscription} from "rxjs";
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FormGroup} from "@angular/forms";
import {News} from "./view-models/news/news";
import {NewsType} from "./view-models/newstype/newstype";
import {TypeService} from "./services/type.service";
import {NewsTypePaging} from "./view-models/newstype/newstype-paging";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  newsPaging: NewsPaging;
  newsFirst : News;
  newstypes : NewsTypePaging;

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
              private newsTypesService : TypeService) {
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
    this.getTypes();
    this.getNews();
  }

  getNews(){
    this.newsService.getLatestNews().subscribe(
      res =>{
        if (res.success && res.data) {
          console.log("res day :    ");
          console.log(res.data);
          this.newsPaging = plainToClass(NewsPaging, res.data);
          //
          // this.newsLeft = this.newsPaging.Items.splice(0, 4);
          // this.newsRight = this.newsPaging.Items.splice(0, 4);
          this.newsFirst = this.newsPaging.Items[0];
        } else {
          this.toastr.error(" res is not succeeds" +res.message);
        }
      },
      error => {
        this.toastr.error("error while get news" + this.translate.instant('COMMON.GET.FAILED'));
      })
  }
  getTypes(){
    this.newsTypesService.getNewsTypes().subscribe(res => {
      if (res.success && res.data) {
        console.log("res day :    ");
        console.log(res.data);
        this.newstypes = plainToClass(NewsTypePaging, res.data);
      } else {
        this.toastr.error(" res is not succeeds" +res.message);
      }
    }, error =>{
      this.toastr.error("error while get types" + this.translate.instant('COMMON.GET.FAILED'));
    })
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppComponent,
      providers: [TranslateService]
    };
  }

}
