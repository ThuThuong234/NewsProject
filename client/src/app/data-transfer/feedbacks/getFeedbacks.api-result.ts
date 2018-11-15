import { ApiResult } from '../api-result';
import { FeedbackPagingVM } from '../../view-models/feedbacks/feedback-paging-vm';

export class GetFeedbacksApiResult extends ApiResult {
  data: FeedbackPagingVM;
}
