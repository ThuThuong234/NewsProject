import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiResult } from '../data-transfer/api-result';
import { SpinService } from './spin.service';

import {News} from "../view-models/news/news";
import {GetNewsApiResults} from "../data-transfer/news/getNews.api-results";
import {GetNewsApiResult} from "../data-transfer/news/getNews.api-result";

@Injectable()
export class NewsService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public getLatestNews() {
    return super.apiGet<GetNewsApiResults>("/");

  }

  public getNewsList() {
    return super.apiGet<GetNewsApiResults>("/admin/news",null,true);
  }

  public getNews(id: number) {
    return super.apiGet<GetNewsApiResult>("/admin/news/"+id);
  }

  public createNews(news: News) {
    return super.apiPost<ApiResult>('/admin/news', news, null, true);
  }



  // public updateNews(id, news: News) {
  //   const data = {
  //     fullname: news.username
  //   };
  //   return super.apiPut<ApiResult>('/users/' + id, data, null, true);
  // }

  public deleteNews(id: number) {
    return super.apiDelete<ApiResult>('/admin/news/' + id, null, true);
  }

}
