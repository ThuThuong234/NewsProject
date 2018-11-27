import { ApiResult } from '../api-result';
import { User } from '../../view-models/users/user';

export class GetUserApiResult extends ApiResult {
  data: User;
}
