import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellGroupComponent } from './number-marathon-test-phase/cell-group/cell-group.component';
import { AppRoutingModule } from '../app-routing.module';
import { NumberMarathonTestPhaseComponent } from './number-marathon-test-phase/number-marathon-test-phase.component';
import { NumberMarathonInitPhaseComponent } from './number-marathon-init-phase/number-marathon-init-phase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberMarathonComponent } from './number-marathon.component';


@NgModule({
  declarations: [
    NumberMarathonInitPhaseComponent,
    NumberMarathonTestPhaseComponent,
    CellGroupComponent,
    NumberMarathonComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NumberMarathonModule { }
