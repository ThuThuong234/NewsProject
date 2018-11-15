import { Type } from 'class-transformer';

import { PagingVM } from '../paging-vm';
import { UserItemVM } from './user-item-vm';

export class UserPagingVM extends PagingVM {
  @Type(() => UserItemVM)
  users: UserItemVM[];
}
