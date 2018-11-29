import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SpinService } from './spin.service';
import {GetNewsTypeApiResult} from "../data-transfer/newstype/getNewsType.api-result";
import {GetNewsTypesApiResults} from "../data-transfer/newstype/getNewsTypes.api-results";

@Injectable()
export class TypeService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }


  public getNewsTypes() {
    return super.apiGet<GetNewsTypesApiResults>('/admin/types' ,null, true);
  }

  public getNewsType(id) {
    return super.apiGet<GetNewsTypeApiResult>('/admin/types' + id, null, true);
  }
}
