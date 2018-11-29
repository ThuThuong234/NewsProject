import { ApiResult } from '../api-result';
import { News } from '../../view-models/news/news';
import {NewsType} from "../../view-models/newstype/newstype";

export class GetNewsTypeApiResult extends ApiResult {
  data: NewsType;
}
