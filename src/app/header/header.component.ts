import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, combineLatestAll, filter, map, Observable, tap } from 'rxjs';
import { TestPhaseService } from '../services/test-phase.service';
import { TestTimerService } from '../services/test-timer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMemoPhase$: Observable<boolean>
  timer$: Observable<string>

  constructor(
    private testPhaseService: TestPhaseService, 
    private testTimerService: TestTimerService, 
    public router: Router) {
    const routerNavigationEvent$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event as NavigationEnd),
      tap((event) => {
        if(event.url === '/number-marathon'){
          this.testPhaseService.nextTestPhase('new')
        }
      })
    );
    this.isMemoPhase$ = combineLatest([this.testPhaseService.testPhase$, routerNavigationEvent$]).pipe(
      map(([testPhase, event]) => {
        return testPhase === 'memo' && event.url === '/number-marathon'
      })
    )
    this.timer$ = this.testTimerService.timer$;
  }

}
