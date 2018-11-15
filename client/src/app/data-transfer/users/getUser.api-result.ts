import { ApiResult } from '../api-result';
import { UserVM } from '../../view-models/users/user-vm';

export class GetUserApiResult extends ApiResult {
  data: UserVM;
}
