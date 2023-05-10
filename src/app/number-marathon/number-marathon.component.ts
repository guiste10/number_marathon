import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, take, tap } from 'rxjs';
import { TestPhaseService } from '../services/test-phase.service';
import { InitPhaseConfig, TestPhase } from '../types/types';
import { NumberMarathonInitPhaseComponent } from './number-marathon-init-phase/number-marathon-init-phase.component';

@UntilDestroy()
@Component({
  selector: 'app-number-marathon',
  templateUrl: './number-marathon.component.html',
  styleUrls: ['./number-marathon.component.css']
})
export class NumberMarathonComponent {

  initPhaseConfig: InitPhaseConfig;
  testPhase$: Observable<TestPhase>;

  @ViewChild('initPhaseComponent') initPhaseComponent: NumberMarathonInitPhaseComponent;

  constructor(public testPhaseService: TestPhaseService){
    this.testPhase$ = testPhaseService.testPhase$;
  }

  startTest($event: InitPhaseConfig) {
    this.initPhaseConfig = $event;
    this.testPhaseService.nextTestPhase();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown($event: KeyboardEvent) {
    if($event.key === ' '){
      this.testPhase$.pipe(
        take(1),
        tap((testPhase) => {
          if (testPhase === 'new'){
            this.initPhaseComponent.onSubmit();
          } else {
            this.testPhaseService.nextTestPhase();
            $event.preventDefault();
          }
        }),
        untilDestroyed(this)
      ).subscribe();
    }
  }
}
