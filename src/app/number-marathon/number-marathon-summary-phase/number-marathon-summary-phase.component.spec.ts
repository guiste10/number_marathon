import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberMarathonSummaryPhaseComponent } from './number-marathon-summary-phase.component';


describe('NumberMarathonISummaryPhaseComponent', () => {
  let component: NumberMarathonSummaryPhaseComponent;
  let fixture: ComponentFixture<NumberMarathonSummaryPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberMarathonSummaryPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberMarathonSummaryPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
