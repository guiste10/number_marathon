import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellGroupComponent } from './number-marathon-test-phase/cell-group/cell-group.component';
import { AppRoutingModule } from '../app-routing.module';
import { NumberMarathonTestPhaseComponent } from './number-marathon-test-phase/number-marathon-test-phase.component';
import { NumberMarathonInitPhaseComponent } from './number-marathon-init-phase/number-marathon-init-phase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberMarathonComponent } from './number-marathon.component';
import { NumberMarathonSummaryPhaseComponent } from './number-marathon-summary-phase/number-marathon-summary-phase.component';
import { TestPhaseService } from '../services/test-phase.service';
import { TestResultSummaryService } from '../services/test-result-summary.service';
import { TestTimerService } from '../services/test-timer.service';


@NgModule({
  declarations: [
    NumberMarathonInitPhaseComponent,
    NumberMarathonTestPhaseComponent,
    CellGroupComponent,
    NumberMarathonComponent,
    NumberMarathonSummaryPhaseComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TestPhaseService, TestResultSummaryService, TestTimerService],
})
export class NumberMarathonModule { }
