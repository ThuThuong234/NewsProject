import { ApiResult } from '../api-result';
import { News } from '../../view-models/news/news';

export class GetCommentsApiResult extends ApiResult {
  data: News;
}
