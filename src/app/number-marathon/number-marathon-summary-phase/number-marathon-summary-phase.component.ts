import { Component, OnDestroy } from '@angular/core';
import { TestResultSummaryService } from 'src/app/services/test-result-summary.service';
import { BestScore, TimedTestSummary } from 'src/app/types/types';

@Component({
  selector: 'app-number-marathon-summary-phase',
  templateUrl: './number-marathon-summary-phase.component.html',
  styleUrls: ['./number-marathon-summary-phase.component.css']
})
export class NumberMarathonSummaryPhaseComponent implements OnDestroy {

  testSummary: TimedTestSummary
  bestScore: BestScore

  constructor(    
    private testResultSummaryService: TestResultSummaryService,
  ){
    this.testSummary = this.testResultSummaryService.getTimedScoreSummary();
    this.bestScore = this.testResultSummaryService.saveAndGetBestScore();
  }

  ngOnDestroy(): void {
    this.testResultSummaryService.resetSummary();
  }
}

