import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { deserialize } from 'class-transformer';

import { SpinService } from './spin.service';

import { ApiConstants } from '../common/api-constants';
import { SessionVM } from '../view-models/session/session-vm';

@Injectable()
export class APIService {

  constructor(private httpClient: HttpClient, private spinService: SpinService) { }

  protected apiGet<T>(path: string, params: HttpParams = null, hasToken: boolean = false): Observable<T> {
    return this.apiRun('get', path, null, params, hasToken);
  }

  protected apiPost<T>(path: string, body: any = null, params: HttpParams = null, hasToken: boolean = false): Observable<T> {
    return this.apiRun('post', path, body, params, hasToken);
  }

  protected apiPut<T>(path: string, body: any = null, params: HttpParams = null, hasToken: boolean = false): Observable<T> {
    return this.apiRun('put', path, body, params, hasToken);
  }

  protected apiDelete<T>(path: string, params: HttpParams = null, hasToken: boolean = false): Observable<T> {
    return this.apiRun('delete', path, null, params, hasToken);
  }

  protected apiRun<T>(method: string, path: string, body: any = null, params: HttpParams = null, hasToken: boolean = false): Observable<T> {
    // set url
    const url = this.appendUrl(path);

    // set header
    let headers = new HttpHeaders();
    headers = this.appendHeader(headers);
    if (hasToken) {
      headers = this.appendAuthorizationHeader(headers);
    }

    this.spinService.start();

    switch (method) {
      case 'post':
        return this.httpClient.post<T>(url, body, {
          params: params,
          headers: headers
        });
      case 'put':
        return this.httpClient.put<T>(url, body, {
          params: params,
          headers: headers
        });
      case 'delete':
        return this.httpClient.delete<T>(url, {
          params: params,
          headers: headers
        });
      default:
        return this.httpClient.get<T>(url, {
          headers: headers,
          params: params
        });
    }
  }

  private appendUrl(path: string) {
    if (path.startsWith('/')) {
      return `${ApiConstants.URL}${path}`;
    }
    return `${ApiConstants.URL}/${path}`;
  }

  private appendHeader(headers: HttpHeaders) {
    headers = headers.set(ApiConstants.HEADER_KEY, ApiConstants.HEADER_VALUE);
    return headers;
  }

  private appendAuthorizationHeader(headers: HttpHeaders) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      const session = deserialize(SessionVM, currentUser);
      if (session && session.token) {
        // headers = headers.set(ApiConstants.HEADER_AUTH, session.token);
      }
    }
    console.log(headers);
    return headers;
  }

}
