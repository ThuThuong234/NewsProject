import { ApiResult } from '../api-result';
import { FeedbackPaging } from '../../view-models/feedbacks/feedback-paging';

export class GetFeedbacksApiResult extends ApiResult {
  data: FeedbackPaging;
}
