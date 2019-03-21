import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, AfterViewInit, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { fromEvent } from 'rxjs';
import { map, throttleTime, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})


export class ToolbarComponent implements OnInit, AfterViewInit {
  // top navbar controls
  navHidden = false;
  navOpening = false;

  // responsive menu controls  
  resClosing = false;
  resOpened = false;
  closeWait = 50; // anim wait for responsive close

  constructor(
    public router: Router
  ) { }


  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(50),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => ((y2 < y1 || y1 < 150) ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    scroll$.pipe(
      filter(direction => direction === Direction.Up)
    ).subscribe(() => {
      this.navOpening = true;
      this.navHidden = false;
    });
    
    scroll$.pipe(
      filter(direction => direction === Direction.Down))
      .subscribe(() => this.navHidden = true);
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => { if (event instanceof NavigationEnd) this.close() });
  }

  onExpand() {
    (!this.resOpened) ? this.open() : this.close();
  }

  open() {
      this.resOpened = true;
  }
  
  close() {
    this.resClosing = true;
    setTimeout(() => {
      this.resOpened = false;
      this.resClosing = false;
    }, this.closeWait);    
  }
}
