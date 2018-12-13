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

  public getFeedbacks() {

    return super.apiGet<GetFeedbacksApiResult>("/admin/feedbacks",null, true);
  }

  public getFeedback(id: number) {

    return super.apiGet<GetFeedbackApiResult>("/admin/feedbacks"+id,null, true);
  }

  public createFeedback(feedback: Feedback) {
    let params = new HttpParams();
    params = params.set('email', feedback.email);
    params = params.set('content', feedback.content);
    params = params.set('posted_date', feedback.posted_date.toDateString());
    return super.apiPost<ApiResult>('/feedback', feedback,null , true);
  }

}
