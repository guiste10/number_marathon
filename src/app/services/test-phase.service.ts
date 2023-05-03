import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { TestPhase } from 'src/app/types/types';

@Injectable()
export class TestPhaseService {
    private testPhase$: Observable<TestPhase>;
    private testPhaseSubject$: Subject<TestPhase>;

    constructor() {
        this.testPhaseSubject$ = new BehaviorSubject('new');
        this.testPhase$ = this.testPhaseSubject$.asObservable();
    }

    changeTestPhase(testPhase: TestPhase): void{
        this.testPhaseSubject$.next(testPhase);
    }

    isMemoPhase(): Observable<boolean> {
        return this.testPhase$.pipe(
            map((testPhase) => testPhase === 'memo'),
        )
    }
}