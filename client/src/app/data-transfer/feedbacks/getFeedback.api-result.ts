import { ApiResult } from '../api-result';
import { Feedback } from '../../view-models/feedbacks/feedback';

export class GetFeedbackApiResult extends ApiResult {
  data: Feedback ;
}
