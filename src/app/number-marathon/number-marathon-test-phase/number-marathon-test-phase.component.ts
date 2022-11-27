import { Component, Input, OnInit } from '@angular/core';
import { CellGroupComponent } from './cell-group/cell-group.component';

@Component({
  selector: 'app-number-marathon-test-phase',
  templateUrl: './number-marathon-test-phase.component.html',
  styleUrls: ['./number-marathon-test-phase.component.css']
})
export class NumberMarathonTestPhaseComponent {

  @Input() cellGroupWidth: number;
  cellGroups: Array<number>;

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
