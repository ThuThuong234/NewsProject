import { ApiResult } from '../api-result';
import { FeedbackDetailVM } from '../../view-models/feedbacks/feedback-detail-vm';

export class GetFeedbackApiResult extends ApiResult {
  data: FeedbackDetailVM;
}
