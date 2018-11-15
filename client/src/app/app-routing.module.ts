import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthorizeService } from './services/authorize.service';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '/admin',
    redirectTo: 'login',
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
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '/admin',
    component: DefaultLayoutComponent,
    canActivate: [AuthorizeService],
    children: [
      // {
      //   path: 'feedbacks',
      //   canActivate: [AuthorizeService],
      //   loadChildren: './views/feedbacks/feedbacks.module#FeedbacksModule'
      // }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
