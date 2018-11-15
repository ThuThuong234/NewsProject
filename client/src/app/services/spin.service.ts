import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinService {
  private spinSource = new BehaviorSubject<boolean>(null);
  public spin$ = this.spinSource.asObservable();

  constructor() { }

  public start() {
    this.spinSource.next(true);
    setTimeout(() => this.stop(), 1000);
  }

  private stop() {
    this.spinSource.next(false);
  }
}
