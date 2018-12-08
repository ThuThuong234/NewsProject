import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiResult } from '../data-transfer/api-result';
import { SpinService } from './spin.service';

import { Login } from '../view-models/users/login';
import { LoginApiResult } from '../data-transfer/users/login.api-result';

@Injectable()
export class UserService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public login(login: Login) {
    return super.apiPost<LoginApiResult>('/admin/signin', login);
  }

  public logout() {
    return super.apiPost<ApiResult>('/users/logout', null, null, true);
  }

}
