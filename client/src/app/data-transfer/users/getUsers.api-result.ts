import { ApiResult } from '../api-result';
import { UserPagingVM } from '../../view-models/users/user-paging-vm';

export class GetUsersApiResult extends ApiResult {
  data: UserPagingVM;
}
