import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-marathon-test-phase',
  templateUrl: './number-marathon-test-phase.component.html',
  styleUrls: ['./number-marathon-test-phase.component.css']
})
export class NumberMarathonTestPhaseComponent implements OnInit{

  @Input() cellGroupWidth: number;
  cellGroups: Array<number>;

  ngOnInit(): void {
    //this.cellGroups = this.numSequence(3);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
