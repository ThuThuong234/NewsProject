import {Component, ModuleWithProviders, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SessionVM} from "./view-models/session/session-vm";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  session: SessionVM;
  constructor(private router: Router) {
  }

  ngOnInit() {

  }


}
