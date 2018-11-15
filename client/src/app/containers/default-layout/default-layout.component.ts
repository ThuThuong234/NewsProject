import {Component, Input, OnInit} from '@angular/core';
import {adminNavItems} from '../nav/admin';
import {hrNavItems} from '../nav/hr';
import {readerNavItems} from '../nav/reader';
import {AuthenticateService} from '../../services/authenticate.service';
import {SessionVM} from '../../view-models/session/session-vm';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public session: SessionVM;

  constructor(private authService: AuthenticateService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null)
          this.navItems = adminNavItems;
        else
          this.navItems = readerNavItems;

      }
    );
  }

  logout() {
    this.authService.clearSession();
    this.toastr.success(this.translate.instant('LOGOUT.SUCCESS'));
    this.router.navigate(['/login']);
  }
};
