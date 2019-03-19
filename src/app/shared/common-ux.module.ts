import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { RouterModule, Routes } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LogoComponent,
    ToolbarComponent,
  ],
  exports: [
    LogoComponent,
    ToolbarComponent
  ],
})
export class CommonUXModule { }
