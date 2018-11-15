import { ApiResult } from '../api-result';
import { LoginResVM } from '../../view-models/users/login-res-vm';

export class LoginApiResult extends ApiResult {
  data: LoginResVM;
}
