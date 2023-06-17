import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartInquiryComponent } from './start-inquiry.component';

describe('StartInquiryComponent', () => {
  let component: StartInquiryComponent;
  let fixture: ComponentFixture<StartInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
