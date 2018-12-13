import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {Comment} from "./comment";

export class CommentPaging extends Paging {
  @Type(() => Comment)
  Items: Comment[];
}
