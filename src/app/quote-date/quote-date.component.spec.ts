import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDateComponent } from './quote-date.component';

describe('QuoteDateComponent', () => {
  let component: QuoteDateComponent;
  let fixture: ComponentFixture<QuoteDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
