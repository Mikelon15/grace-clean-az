import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less']
})

export class AppointmentComponent implements OnInit {
  availableSlots = [
    '8:00', '8:30', '9:00', '9:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '1:00', '1:30',
    '2:00', '2:30', '3:00', '3:30', '4:30', '4:30'
  ];
  form: FormGroup;
  successSent = false;
  str = 'some text';

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient
  ) { }
  
  ngOnInit() { 
    this.createForm();
  }
  
  createForm() {
    // this.availableSlots.length
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date:  ['', Validators.required],
      message: [''],
    });

    console.log(this.form.controls);
  }
  onSubmit() {
    const { name, email, message, date } = this.form.value;
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    console.log(date);
    let formRequest = { name, email, message, date };
    this.form.reset();
    this.successSent = true;
  }
  sayHello() {
    let prom = this.http.get('https://us-central1-grace-clean.cloudfunctions.net/helloWorld');
    prom.subscribe(
      (val: any) => {
        this.str = val.msg;
      },
      (error) => {this.str = error; console.log(error)}
    );
  }

}
