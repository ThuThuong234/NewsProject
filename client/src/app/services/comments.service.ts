import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiResult } from '../data-transfer/api-result';
import { SpinService } from './spin.service';

import {News} from "../view-models/news/news";
import {GetNewsApiResults} from "../data-transfer/news/getNews.api-results";
import {GetNewsApiResult} from "../data-transfer/news/getNews.api-result";
import {GetCommentsApiResults} from "../data-transfer/comments/getComments.api-results";

@Injectable()
export class CommentsService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public getComments(id: number) {
    return super.apiGet<GetCommentsApiResults>("/admin/news/"+id+"/comments",null,true);
  }

  public createComment(news: News) {
    return super.apiPost<ApiResult>('/admin/news', news, null, true);
  }


}
