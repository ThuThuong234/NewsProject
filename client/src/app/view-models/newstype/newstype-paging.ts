import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {NewsType} from "./newstype";

export class NewsTypePaging extends Paging {
  @Type(() => NewsType)
  Items: NewsType[];
}
