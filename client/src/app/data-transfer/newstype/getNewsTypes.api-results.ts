import { ApiResult } from '../api-result';
import {NewsTypePaging} from "../../view-models/newstype/newstype-paging";

export class GetNewsTypesApiResults extends ApiResult {
  data: NewsTypePaging;
}
