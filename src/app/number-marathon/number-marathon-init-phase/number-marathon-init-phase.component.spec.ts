import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberMarathonInitPhaseComponent } from './number-marathon-init-phase.component';

describe('NumberMarathonInitPhaseComponent', () => {
  let component: NumberMarathonInitPhaseComponent;
  let fixture: ComponentFixture<NumberMarathonInitPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberMarathonInitPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberMarathonInitPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
