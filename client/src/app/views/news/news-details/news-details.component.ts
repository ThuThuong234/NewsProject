import { Component, OnInit } from '@angular/core';
import {News} from "../../../view-models/news/news";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../../../services/news.service";
import {deserialize, plainToClass} from "class-transformer";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {NewsPaging} from "../../../view-models/news/news-paging";
import {SessionVM} from "../../../view-models/session/session-vm";
import {CommentsService} from "../../../services/comments.service";
import {CommentPaging} from "../../../view-models/comments/comment-paging";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  newsPaing : NewsPaging = new NewsPaging();
  news : News = new News();
  commentPaging : CommentPaging  = new CommentPaging();
  session: SessionVM;
  constructor(private router: Router,
              private route : ActivatedRoute,
              private newsService: NewsService,
              private toastr: ToastrService,
              private translate: TranslateService,
              private commentService : CommentsService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getNews(id);
    this.getComments(id);
    sessionStorage.setItem("ssNewsContent",this.news.content);
    console.log("no chua co chya");
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {

      this.session = deserialize(SessionVM, currentUser);

    }
  }
  onLogin(){
    this.router.navigate(['/login']);
  }

  getNews(id){
    if(id){
      this.newsService.getNews(id).subscribe(res=>{
        if(res.success && res.data){
          this.newsPaing = plainToClass(NewsPaging, res.data);
          this.news = this.newsPaing.Items[0];
          console.log(res.data);
        }
        else {

          this.toastr.error(res.message);
          console.log(res.message);
        }
        },
        error1 => {
          console.log(error1);
          this.toastr.error(this.translate.instant('COMMON.GET.FAILED'));
        });
    }
  }
  getComments(id){
    if(id){
      this.commentService.getComments(id).subscribe(res=>{
        if(res.success && res.data){
          this.commentPaging = plainToClass(CommentPaging, res.data);
        }
        else {
          alert(res.message);
        }
        }
      ,error1 => {
        alert(error1);
        })
    }

  }
  getTypes(id :number){

    this.router.navigate(['/types/',id]);
  }


}
