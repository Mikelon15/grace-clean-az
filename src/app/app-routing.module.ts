import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { QuoteDateComponent } from './quote-date/quote-date.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  { path: 'index', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'quote', component: QuoteDateComponent },
  { path: 'appointment', component: AppointmentComponent },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
