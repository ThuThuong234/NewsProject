import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { serialize, deserialize } from 'class-transformer';

import { SessionVM } from '../view-models/session/session-vm';

@Injectable()
export class AuthenticateService {
  private sessionSource = new BehaviorSubject<SessionVM>(null);
  session$ = this.sessionSource.asObservable();
  redirectUrl: string;

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      const session = deserialize(SessionVM, currentUser);
      if (session) {
        this.setSession(session);
      }
    }
  }

  setSession(session: SessionVM) {
    localStorage.setItem('currentUser', serialize(session));
    this.sessionSource.next(session);
  }

  clearSession() {
    localStorage.removeItem('currentUser');
    this.sessionSource.next(null);
  }
}
