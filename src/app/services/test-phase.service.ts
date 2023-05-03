import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { TestPhase } from 'src/app/types/types';

@Injectable()
export class TestPhaseService {
    timer$: Observable<string>;

    private startTime: number;
    private timerSubject$: Subject<string>;
    private testPhase$: Observable<TestPhase>;
    private testPhaseSubject$: Subject<TestPhase>;

    constructor() {
        this.testPhaseSubject$ = new BehaviorSubject('new');
        this.testPhase$ = this.testPhaseSubject$.asObservable();
        this.timerSubject$ = new Subject();
        this.timer$ = this.timerSubject$.asObservable();
    }

    changeTestPhase(testPhase: TestPhase): void{
        this.testPhaseSubject$.next(testPhase);
        if(testPhase === 'memo') {
            this.startTimer();
        }
    }

    isMemoPhase(): Observable<boolean> {
        return this.testPhase$.pipe(
            map((testPhase) => testPhase === 'memo'),
        )
    }

    private startTimer(): void {
        this.startTime = Date.now();
        setInterval(() => {
          this.updateTimer();
        }, 1000);
    }

    private updateTimer(): void {
        const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
        const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
        this.timerSubject$.next(`${minutes}:${seconds}`);
    }
}