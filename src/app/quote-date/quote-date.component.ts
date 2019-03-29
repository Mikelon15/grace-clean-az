import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quote-date',
  templateUrl: './quote-date.component.html',
  styleUrls: ['./quote-date.component.less']
})
export class QuoteDateComponent {
  roomCount: String[] = ['1','2','3','4+'];
  cleanTypes: string[] = [
    'Standard', 'Deep', 'Party/Special Occasion', 'Move In/Move Out'
  ];

  oftenCount: string[] = [
    'One time', 'Weekly', 'Twice a month', 'Monthly' 
  ]

  additionalTypes: string[] = [
    'Oven cleaning', 'Refridgerator', 'Wall washing', 'Mini Blinds', 'Light Fixtures' 
  ]

  ovenCleaning = false;
  refridgerator = false;
  wallWashing = false;
  miniBlinds = false;
  lightFixtures = false;

  favoriteSeason: string;
  form: FormGroup;

  constructor(private fb: FormBuilder, private af: AngularFirestore) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.ovenCleaning);
    // const { name, email, message } = this.form.value;
    // const date = Date();
    // const html = `
    //   <div>From: ${name}</div>
    //   <div>Email: <a href="mailto:${email}">${email}</a></div>
    //   <div>Date: ${date}</div>
    //   <div>Message: ${message}</div>
    // `;
    // let formRequest = { name, email, message, date, html };
    // this.af.collection('messages').add(formRequest);
    // this.form.reset();
  }
}
