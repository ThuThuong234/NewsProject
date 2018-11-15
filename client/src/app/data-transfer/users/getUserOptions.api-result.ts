import { ApiResult } from '../api-result';
import { UserOptionVM } from '../../view-models/users/user-option-vm';

export class GetUserOptionsApiResult extends ApiResult {
  data: UserOptionVM[];
}
