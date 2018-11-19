import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticateService} from "../../services/authenticate.service";
import {adminNavItems} from "../nav/admin";
import {readerNavItems} from "../nav/reader";
import {SessionVM} from "../../view-models/session/session-vm";

@Component({
  selector: 'app-default-admin-layout',
  templateUrl: './default-admin-layout.component.html',
  styleUrls: ['./default-admin-layout.component.css']
})
export class DefaultAdminLayoutComponent implements OnInit {

  public navItems = [];
  public session: SessionVM;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(private authService: AuthenticateService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
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
}


