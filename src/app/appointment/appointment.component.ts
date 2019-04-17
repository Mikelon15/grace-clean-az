import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less']
})

export class AppointmentComponent implements OnInit {
  sel = -1;
  form: FormGroup;
  successSent = false;
  isLoading = false;
  apptSubmitted = false;
  noDateError = false;
  availableSlots = []
  slots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];
  selectTime =  [
    '1000', '1030', '1100', '1130',
    '1200', '1230', '0100', '0130', '0200',
    '0230', '0300', '0330', '0400', '0430'
  ];

  constructor(
    private fb: FormBuilder, 
    private fire: FirebaseService,
  ) { }
  
  ngOnInit() { 
    this.createForm();
  }
  
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      message: [''],
    });

    this.form.valueChanges.subscribe(val => {
      let { date } = this.form.value;
      let selDate = '';
      if(date) {
        selDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        this.noDateError = false;
      } else { return; }

      this.fire.getAvailableTimes(selDate).subscribe((val: string[]) => {
        this.sel = -1;
        this.availableSlots = [...this.slots];
        for(let i = 0; i < val.length; i++){
          let t = this.selectTime.lastIndexOf(val[i]);
          this.availableSlots.splice(t, 1);
        }
      })
    });

  }
  onSelectTime(i) {
    this.sel = i;
    this.noDateError = false;
  }
  onSubmit() {
    const { name, email, message, date, phone, address } = this.form.value;
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    let selDate = `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`
    
    const time = this.selectTime[this.slots.lastIndexOf(this.availableSlots[this.sel])];
    if(!time) { this.noDateError = true; return; }

    let formRequest = { 
      name: name,
      address: address,
      email: email,
      phone: phone,
      notes: message,
      date: selDate,
      time: time
    };
    
    this.isLoading = true; 
    this.fire.postAppointmentTime(formRequest).subscribe(val => {
      this.isLoading = false;
      this.apptSubmitted = true;
      this.successSent = true;
      this.form.reset();
      this.createForm();
    });
    
  }
}
