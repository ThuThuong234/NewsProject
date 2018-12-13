import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthenticateService,) { }

  ngOnInit() {
  }
  doLogout(){
    this.authService.clearSession();
    this.router.navigate(['/']);
  }
  navigateNews(){

    this.router.navigate(['/admin/news']);
  }
  navigateTypes(){

    this.router.navigate(['/admin/types']);
  }
  navigateFeedbacks(){

    this.router.navigate(['/admin/feedbacks']);
  }
}
