import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberMarathonTestPhaseComponent } from './number-marathon-test-phase.component';

describe('NumberMarathonTestPhaseComponent', () => {
  let component: NumberMarathonTestPhaseComponent;
  let fixture: ComponentFixture<NumberMarathonTestPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberMarathonTestPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberMarathonTestPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
