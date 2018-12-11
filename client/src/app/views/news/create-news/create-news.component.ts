import { Component, OnInit } from '@angular/core';

import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {Login} from "../../../view-models/users/login";
import {News} from "../../../view-models/news/news";
import {NewsService} from "../../../services/news.service";
import {Router} from "@angular/router";
import {deserialize} from "class-transformer";
import {SessionVM} from "../../../view-models/session/session-vm";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  news: News = new News();
  session: SessionVM;
  // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  constructor(private router: Router,private newsService: NewsService,
              ) { }

  ngOnInit() {

  }

  createNews(){
    this.news.postdate = new Date();
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {

      this.session = deserialize(SessionVM, currentUser);
      if (this.session) {
        this.news.username = this.session.username;
      }
    }

    if(this.news){
      this.newsService.createNews(this.news).subscribe(res =>{
          if (res.success) {

          } else {}

        },
        error1 => {});
    }
  }
}
