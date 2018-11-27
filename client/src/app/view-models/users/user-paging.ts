import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {User} from "./user";

export class UserPaging extends Paging {
  users: User[];
}
