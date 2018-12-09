import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeService } from './services/authorize.service';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import {AppComponent} from "./app.component";
import {CreateNewsComponent} from "./views/news/create-news/create-news.component"
import {NewsTypeComponent} from "./views/news-type/news-type.component";
import {TypeDetailsComponent} from "./views/type-details/type-details.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'admin',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'types',
    component: NewsTypeComponent,
    pathMatch: 'full',
  },
  {
    path: 'types/:id',
    component: TypeDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: '404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: '500'
    }
  },
  {
    path: 'admin/news/create',
    canActivate: [AuthorizeService],
    component:CreateNewsComponent,
    pathMatch: 'full',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingCoponents = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  CreateNewsComponent,
  P404Component,
  P500Component,
  NewsTypeComponent,
  TypeDetailsComponent,
  DashboardComponent,
]
