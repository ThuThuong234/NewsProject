import { environment } from '../../environments/environment';

export class ApiConstants {
  public static readonly URL = environment.apiUrl;
  public static readonly HEADER_KEY = environment.apiHeaderKey;
  public static readonly HEADER_VALUE = environment.apiHeaderValue;
  public static readonly HEADER_AUTH = environment.apiHeaderAuth;
}
