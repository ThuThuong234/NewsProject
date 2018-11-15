import { Type } from 'class-transformer';

import { FeedbackVM } from './feedback-vm';
// import { TemplateItemVM } from '../templates/template-item-vm';

export class FeedbackDetailVM {
  @Type(() => FeedbackVM)
  feedback: FeedbackVM;
  // @Type(() => TemplateItemVM)
  // template: TemplateItemVM;
}
