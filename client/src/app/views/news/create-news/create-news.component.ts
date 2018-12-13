import {Component, OnInit, ViewChild} from '@angular/core';
import {News} from "../../../view-models/news/news";
import {NewsService} from "../../../services/news.service";
import {Router} from "@angular/router";
import {deserialize} from "class-transformer";
import {SessionVM} from "../../../view-models/session/session-vm";
import {ModalDirective} from "ngx-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  news: News = new News();
  session: SessionVM;
  @ViewChild('confirmsave') confirmModal: ModalDirective;

  constructor(private router: Router,
              private newsService: NewsService,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit() {

  }
  insertNews() {
    this.news.content = sessionStorage.getItem('currentInsertNews');
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {

      this.session = deserialize(SessionVM, currentUser);
      if (this.session) {
        this.news.username = this.session.username;
      }
    }

    if (this.news.title != null && this.news.title != "" && this.news.content != null && this.news.content != "") {
      this.newsService.createNews(this.news).subscribe(res => {
          if (res.success) {
            this.router.navigate(['/admin/news']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error1 => {
          this.toastr.error(error1);
        });
    } else {
      alert("validate failed");
    }
  }
}
