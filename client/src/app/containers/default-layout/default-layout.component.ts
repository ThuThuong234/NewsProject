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
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(
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
  }


};
