import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Login } from '../../view-models/users/login';
import { AuthenticateService } from '../../services/authenticate.service';
import { SessionVM } from '../../view-models/session/session-vm';
import { UserService } from '../../services/user.service';

import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login = new Login();
  session: SessionVM;

  constructor(private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService,
              private authService: AuthenticateService,
              private userService: UserService) { }

  ngOnInit() {
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        console.log("sesssssssssssssssssssssssssssssssss  ");
        console.log(data);
        if (this.session && this.session.token != null) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  doLogin() {
    if (this.model.username && this.model.password) {
      this.userService.login(this.model).subscribe(
        res => {
          if (res.data && res.data.token) {
            const newSession = new SessionVM(res.data.token, res.data.username);
            this.authService.setSession(newSession);
            this.toastr.success(this.translate.instant('LOGIN.LOGIN_SUCESS'));

          } else {
            this.toastr.error(res.message);
          }
        },
        error => {
          this.toastr.error(this.translate.instant('LOGIN.LOGIN_FAILED'));
        });
    }
  }
}
