import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { environment } from '../environments/environment';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonUXModule } from './shared/common-ux.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { QuoteDateComponent } from './quote-date/quote-date.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ServicesComponent,
    QuoteDateComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonUXModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // google recaptcha
    RecaptchaFormsModule,
    RecaptchaModule,
    
    // material
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule

  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6Le1kZkUAAAAAEit6eESjoAT2PL2evXprBFcIidS',
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
