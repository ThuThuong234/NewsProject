import { ApiResult } from '../api-result';
import { NewsPaging } from '../../view-models/news/news-paging';

export class GetNewsApiResults extends ApiResult {
  data: NewsPaging;
}
