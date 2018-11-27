import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiResult } from '../data-transfer/api-result';
import { SpinService } from './spin.service';

import { Login } from '../view-models/users/login';
import { LoginApiResult } from '../data-transfer/users/login.api-result';
import { GetUsersApiResult } from '../data-transfer/users/getUsers.api-result';
import { GetUserApiResult } from '../data-transfer/users/getUser.api-result';
import { User } from '../view-models/users/user';
import { GetUserOptionsApiResult } from '../data-transfer/users/getUserOptions.api-result';

@Injectable()
export class UserService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public login(login: Login) {
    return super.apiPost<LoginApiResult>('/users/login', login);
  }

  public logout() {
    return super.apiPost<ApiResult>('/users/logout', null, null, true);
  }

  public getUsers(current_page: number, keywords: string) {
    let params = new HttpParams();
    params = params.set('current_page', current_page.toString());
    if (keywords) {
      params = params.set('q', keywords);
    }
    return super.apiGet<GetUsersApiResult>('/users', params, true);
  }

  public getUser(id: number) {
    return super.apiGet<GetUserApiResult>('/users/' + id, null, true);
  }

  public getUserOptions() {
    return super.apiGet<GetUserOptionsApiResult>('/users/options', null, true);
  }

  public updateUser(id, user: User) {
    const data = {
      fullname: user.username
    };
    return super.apiPut<ApiResult>('/users/' + id, data, null, true);
  }
}
