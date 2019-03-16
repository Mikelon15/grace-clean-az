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
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100px)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})


export class ToolbarComponent implements OnInit, AfterViewInit {
  private isVisible = false;
  isResponsive = false;
  isClosing = false;
  isOpening = false;
  isMobile = false;
  toggling = 150; // toggling anim duration in ms

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  constructor(
    public router: Router
  ) { }

  ngAfterViewInit() {
    if(window.innerWidth < 700) {
      this.isVisible = true;
      this.isMobile = true;
    }
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(100),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => ((y2 < y1 && (window.pageYOffset > 25 || this.isMobile) ) ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );
    
    const resize$ = fromEvent(window, 'resize').pipe(
      map(()=> window.innerWidth),
      map((w) => {
        if (w < 700) {
          this.isMobile = true;
           return Direction.Up;
          }
          else {
            this.isMobile = false;
           return Direction.Down;
         } 
        }),
      distinctUntilChanged(),
      share()
    );

    const resizeUp$ = resize$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const resizeDown$ = resize$.pipe(
      filter(direction => direction === Direction.Down)
    );

    resizeUp$.subscribe(() => (this.isVisible = true));
    resizeDown$.subscribe(() => (this.isVisible = false));

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => { if (event instanceof NavigationEnd) this.close() });
  }

  onExpand() {
    if (!this.isResponsive) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.isOpening = true;
    setTimeout(() => {
      this.isResponsive = true;
      this.isOpening = false;
    }, this.toggling);
  }

  close() {
    this.isClosing = true;
    setTimeout(() => {
      this.isResponsive = false;
      this.isClosing = false;
    }, this.toggling);
  }
}
