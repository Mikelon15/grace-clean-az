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

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
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
    console.log(this.form.controls);
  }
  onSubmit() {
    const { name, email, message } = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    let formRequest = { name, email, message, date, html };
    this.af.collection('messages').add(formRequest);
    this.form.reset();
  }
}
