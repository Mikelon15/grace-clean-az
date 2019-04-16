import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent {

  form: FormGroup;
  successSent = false;
  constructor(
    private fb: FormBuilder,
    private fire: FirebaseService
  ) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      recaptcha: [null, Validators.required]
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
    let form = { name, email, message, date };

    this.fire.postContactMessage(form).subscribe(val => console.log(val));
    this.form.reset();
    this.successSent = true;
  }

}
