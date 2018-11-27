import { Type } from 'class-transformer';

import { Paging } from '../paging';
import { Feedback} from './feedback';

export class FeedbackPaging extends Paging {
  @Type(() => Feedback)
  feedbacks: Feedback[];
}
