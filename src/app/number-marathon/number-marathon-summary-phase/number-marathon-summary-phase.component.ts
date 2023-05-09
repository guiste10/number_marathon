import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TestPhaseService } from 'src/app/services/test-phase.service';
import { TestResultSummaryService } from 'src/app/services/test-result-summary.service';
import { TestSummary } from 'src/app/types/types';

@Component({
  selector: 'app-number-marathon-summary-phase',
  templateUrl: './number-marathon-summary-phase.component.html',
  styleUrls: ['./number-marathon-summary-phase.component.css']
})
export class NumberMarathonSummaryPhaseComponent{

  totalTime = this.testPhaseService.totalTime;
  testSummary$: Observable<TestSummary>

  constructor(    
    private testResultSummaryService: TestResultSummaryService,
    private testPhaseService: TestPhaseService,
  ){
    this.testSummary$ = this.testResultSummaryService.testSummary$
  }
}

