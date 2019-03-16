import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { RouterModule, Routes } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LogoComponent,
    ToolbarComponent,
    CarouselComponent
  ],
  exports: [
    LogoComponent,
    ToolbarComponent,
    CarouselComponent
  ],
})
export class CommonUXModule { }
