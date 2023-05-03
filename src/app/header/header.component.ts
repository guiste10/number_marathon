import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TestPhaseService } from '../services/test-phase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showTimer$: Observable<boolean>
  timer$: Observable<string>

  constructor(private testPhaseService: TestPhaseService) {
    this.showTimer$ = testPhaseService.isMemoPhase();
    this.timer$ = testPhaseService.timer$;
  }

}
