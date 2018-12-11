import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    PaginationComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent
  ],
  declarations: [
    PaginationComponent,
    ConfirmComponent,
  ]
})
export class SharedModule { }
