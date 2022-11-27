import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumberMarathonTestPhaseComponent } from './number-marathon-test-phase/number-marathon-test-phase.component';

const numberMarathonRoutes: Routes = [
  { path: 'number-marathon-test-phase', component: NumberMarathonTestPhaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(numberMarathonRoutes)],
  exports: [RouterModule]
})
export class NumberMarathonRoutingModule { }
