import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { APIService } from './api.service';
import { SpinService } from './spin.service';

import { GetFeedbacksApiResult } from '../data-transfer/feedbacks/getFeedbacks.api-result';
import { GetFeedbackApiResult } from '../data-transfer/feedbacks/getFeedback.api-result';
import { ApiResult } from '../data-transfer/api-result';
import { Feedback } from '../view-models/feedbacks/feedback';

// ket noi call api
@Injectable()
export class FeedbackService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public getFeedbacks(current_page: number, keywords: string, request_id: number) {
    let params = new HttpParams();
    params = params.set('current_page', current_page.toString());
    params = params.set('request_id', request_id.toString());
    if (keywords) {
      params = params.set('q', keywords);
    }
    return super.apiGet<GetFeedbacksApiResult>("",params, true);
  }

  public getFeedback(id: number, template_included: boolean = null) {
    let params = new HttpParams();
    if (template_included) {
      params = params.set('template_included', template_included.toString());
    }
    return super.apiGet<GetFeedbackApiResult>("",params, true);
  }

  public createFeedback(feedback: Feedback) {
    let params = new HttpParams();
    params = params.set('email', feedback.email);
    params = params.set('content', feedback.content);
    params = params.set('posted_date', feedback.posted_date.toDateString());
    return super.apiPost<ApiResult>('/feedback', feedback,null , true);
  }

}
