import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticateService } from './authenticate.service';

import { SessionVM } from '../view-models/session/session-vm';

@Injectable()
export class AuthorizeService implements CanActivate {
  private session: SessionVM;

  constructor(private authService: AuthenticateService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService) {
    this.authService.session$.subscribe(data => { this.session = data; });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.session && this.session.token) {
     return true;
    }
    this.updateRedirectRoute(state);
    return false;
  }

  updateRedirectRoute(state: RouterStateSnapshot) {
    if (this.session) {
      // Store the attempted URL for redirecting & navigate to login page
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']);
    }
  }
}
