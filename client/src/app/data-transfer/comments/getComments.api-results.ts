import { ApiResult } from '../api-result';
import { NewsPaging } from '../../view-models/news/news-paging';

export class GetCommentsApiResults extends ApiResult {
  data: NewsPaging;
}
