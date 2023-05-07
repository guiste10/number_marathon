import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TestPhaseService } from '../services/test-phase.service';
import { TestPhase } from '../types/types';

@Component({
  selector: 'app-number-marathon',
  templateUrl: './number-marathon.component.html',
  styleUrls: ['./number-marathon.component.css']
})
export class NumberMarathonComponent {

  cellGroupWidth: number;
  testPhase$: Observable<TestPhase>;

  constructor(public testPhaseService: TestPhaseService){
    this.testPhase$ = testPhaseService.testPhase$;
  }

  startTest($event: any) {
    this.cellGroupWidth = $event;
    this.testPhaseService.nextTestPhase();
  }

  onKeydown($event: KeyboardEvent) {
    if($event.key === ' '){
      this.testPhaseService.nextTestPhase();
    }
  }
}
