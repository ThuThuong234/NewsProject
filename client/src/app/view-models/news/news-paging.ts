import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {News} from "./news";

export class NewsPaging extends Paging {
  @Type(() => News)
  Items: News[];
}
