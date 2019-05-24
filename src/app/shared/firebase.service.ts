import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Types from './types.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class FirebaseService {
  endpoint = 'https://us-central1-grace-clean.cloudfunctions.net';
  // endpoint = 'http://localhost:8555';
  constructor(
    private http: HttpClient
  ) { }

  postContactMessage(form: Types.ContactForm): Observable<any> {
    return this.http.post(`${this.endpoint}/api/postContactMessage`, form);
  }

  getAvailableTimes(date: string): Observable<any> {
    return this.http.get(`${this.endpoint}/api/getAvailableTimes/${date}`);
  }

  postAppointmentTime(apptm: Types.Appointment): Observable<any> {
    return this.http.post(`${this.endpoint}/api/postAppointmentTime`, apptm);
  }
}
