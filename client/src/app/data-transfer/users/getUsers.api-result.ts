import { ApiResult } from '../api-result';
import { UserPaging } from '../../view-models/users/user-paging';

export class GetUsersApiResult extends ApiResult {
  data: UserPaging;
}
