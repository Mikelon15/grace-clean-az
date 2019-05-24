import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quote-date',
  templateUrl: './quote-date.component.html',
  styleUrls: ['./quote-date.component.less']
})
export class QuoteDateComponent implements OnInit{
  services = 0;
  additional = 0;
  total = 0;

  roomCount: any = [
    { name: '1', price: 50 }, 
    { name: '2', price: 100 }, 
    { name: '3', price: 150 }, 
    { name: '4+', price: 200 }];

    bathCount: any = [
      { name: '1', price: 25 }, 
      { name: '2', price: 50 }, 
      { name: '3', price: 75 }, 
      { name: '4+', price: 100 }];

    petCount: any = [
      { name: '1', price: 10}, 
      { name: '2', price: 15 }, 
      { name: '3', price: 20 }, 
      { name: '4+', price: 25 }];

  cleanTypes: any = [
    { name: 'Standard', price: 0 }, 
    { name: 'Deep', price: 50 }, 
    { name: 'Party/Special Occasion', price: 50 }, 
    { name: 'Move In/Move Out', price: 50 }];

  oftenCount: any = [
    { name:'One time', price: 0 }, 
    { name:'Weekly', price: -25 }, 
    { name:'Twice a month', price: -15 }, 
    { name: 'Monthly', price: -10 }];

  additionalTypes: any = [
    { name: 'Oven cleaning', price: 10 },
    { name: 'Refridgerator', price: 10 },
    { name: 'Wall washing', price: 10 },
    { name: 'Mini Blinds', price: 10 },
    { name: 'Light Fixtures', price: 10 }]

  ovenCleaning = false;
  refridgerator = false;
  wallWashing = false;
  miniBlinds = false;
  lightFixtures = false;
  provideSupplies = false;

  favoriteSeason: string;
  form: FormGroup;

  constructor(private fb: FormBuilder ) {}

  ngOnInit() {
    this.form = this.fb.group({
      oftenCount: [],
      additionalTypes: [],
      cleanTypes: [],
      roomCount: [],
      bathCount: [],
      petCount: [],

    });

    this.form.valueChanges.subscribe(val => {
      this.services = 0;
      Object.keys(val).forEach(key => {
        if (val[key] && val[key].price) this.services += val[key].price;
      })
      this.total = this.services + this.additional;
    });
    
  }
  additionalSelect(){
    this.additional = 0;
    if(this.provideSupplies) this.additional += 10;
    if(this.refridgerator) this.additional += 10;
    if(this.ovenCleaning) this.additional += 10;
    if(this.wallWashing) this.additional += 10;
    if(this.miniBlinds) this.additional += 10;
    if(this.lightFixtures) this.additional += 10;
    this.total = this.additional + this.services;
  }
}
