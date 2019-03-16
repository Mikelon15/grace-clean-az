import { Component, OnInit, EventEmitter, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnDestroy, AfterViewInit {
  @Input() images: string[];
  @Input() controls = false;
  @Input() interval = 3500; // milliseconds 
  
  slideEvent: EventEmitter<any>;
  autoSlideSubscription: Subscription;
  isSliding = false;
  current = 0;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.slideEvent = new EventEmitter();
    if(this.images.length > 0) {
      document.getElementById(`image${this.current}`).className = `active`;
    }
    
    // listens to slide event or interval event. starts over when either is emitted
    const autoSlide = this.slideEvent.pipe(switchMap(val => interval(this.interval)));
    this.autoSlideSubscription = autoSlide.subscribe(() => this.slideRight());
    this.slideEvent.next();
  }
  
  ngOnDestroy() {
    this.autoSlideSubscription.unsubscribe();
  }

  jumpToSlide(index: number) {
    console.log('jump')
    if (this.isSliding) { return; }
    this.hide('right');
    this.current = index;
    this.slide('right');
    this.slideEvent.next();
  }

  slideRight() {
    if (this.isSliding) { return; }
    this.hide('right');
    this.getNextImage();
    this.slide('right');
    this.slideEvent.next();
  }

  slideLeft() {
    if (this.isSliding) { return; }
    this.hide('left');
    this.getPrevImage();
    this.slide('left');
    this.slideEvent.next();
  }

  slide(dir: string) {
    this.isSliding = true;
    setTimeout(() => { this.isSliding = false; }, 1500);
    document.getElementById(`image${this.current}`).className = `active slide-${dir}`;
  }

  hide(dir: string) {
    const x = document.getElementById(`image${this.current}`);
    x.className = `active hide-${dir}`;
  }

  getNextImage() {
    this.current = (this.current + 1) % this.images.length;
  }

  getPrevImage() {
    this.current = (this.current - 1) % this.images.length;
    if (this.current < 0) {
      this.current = Math.abs(this.images.length + this.current) % this.images.length;
    }
  }


}
