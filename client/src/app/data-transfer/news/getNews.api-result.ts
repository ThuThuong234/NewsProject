import { ApiResult } from '../api-result';
import { News } from '../../view-models/news/news';

export class GetNewsApiResult extends ApiResult {
  data: News;
}
