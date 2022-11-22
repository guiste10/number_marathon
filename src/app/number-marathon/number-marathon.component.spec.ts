import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberMarathonComponent } from './number-marathon.component';

describe('NumberMarathonComponent', () => {
  let component: NumberMarathonComponent;
  let fixture: ComponentFixture<NumberMarathonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberMarathonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberMarathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
