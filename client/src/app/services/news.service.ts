import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiResult } from '../data-transfer/api-result';
import { SpinService } from './spin.service';

import {News} from "../view-models/news/news";
import {GetNewsApiResults} from "../data-transfer/news/getNews.api.results";
import {GetNewsApiResult} from "../data-transfer/news/getFeedback.api-result";

@Injectable()
export class NewsService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public getLatestNews(current_page: number) {
    let params = new HttpParams();
    let a = super.apiGet<GetNewsApiResults>('/', params, true);
    console.log(" fadhfgdffg: "+ a.toString());
    return a;
  }

  public getNewsList(current_page: number/*, keywords: string*/) {
    let params = new HttpParams();
    params = params.set('current_page', current_page.toString());
    // if (keywords) {
    //   params = params.set('q', keywords);
    // }
    return super.apiGet<GetNewsApiResults>('/users', params, true);
  }

  public getNews(id: number) {
    return super.apiGet<GetNewsApiResult>('/users/' + id, null, true);
  }

  public updateNews(id, news: News) {
    const data = {
      fullname: news.username
    };
    return super.apiPut<ApiResult>('/users/' + id, data, null, true);
  }
}
