import { Type } from 'class-transformer';

import { PagingVM } from '../paging-vm';
import { FeedbackItemVM } from './feedback-item-vm';

export class FeedbackPagingVM extends PagingVM {
  @Type(() => FeedbackItemVM)
  feedbacks: FeedbackItemVM[];
}
