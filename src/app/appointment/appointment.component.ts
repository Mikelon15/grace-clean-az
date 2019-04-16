import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less']
})

export class AppointmentComponent implements OnInit {
  sel = ''
  form: FormGroup;
  successSent = false;
  availableSlots = [
    '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '1:00', '1:30', '2:00',
    '2:30', '3:00', '3:30', '4:00', '4:30'
  ];
  selectTime =  [
    '1000', '1030', '1100', '1130',
    '1200', '1230', '0100', '0130', '0200',
    '0230', '0300', '0330', '0400', '0430'
  ];

  constructor(
    private fb: FormBuilder, 
    private fire: FirebaseService
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
  onSelectTime(i) {
    this.sel = i;
  }
  onSubmit() {
    const { name, email, message, date } = this.form.value;
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    
    let formRequest = { 
      name: name,
      email: email,
      phone: '',
      notes: message,
      date: '12121995',
      time: this.selectTime[this.sel]
    };
    this.fire.postAppointmentTime(formRequest).subscribe(val => console.log(val));
    this.form.reset();
    this.successSent = true;
  }
}
