import { Injectable } from "@angular/core";
import { map, Observable, ReplaySubject, Subject, tap } from "rxjs";
import { getNextPhase, TestPhase } from 'src/app/types/types';

@Injectable()
export class TestPhaseService {
    timer$: Observable<string>;
    testPhase$: Observable<TestPhase>;
    totalTime: string;

    private startTime: number;
    private timerSubject$: Subject<string>;
    private testPhaseSubject$: Subject<TestPhase>;
    private currentTestPhase: TestPhase;
    private timeElapsed: string;

    constructor() {
        this.testPhaseSubject$ = new ReplaySubject(1);
        this.testPhase$ = this.testPhaseSubject$.asObservable();
        this.timerSubject$ = new Subject();
        this.timer$ = this.timerSubject$.asObservable();
    }

    
    nextTestPhase(nextPhase?: TestPhase): void{
        this.currentTestPhase = nextPhase ?? getNextPhase(this.currentTestPhase);
        this.testPhaseSubject$.next(this.currentTestPhase)
        if(this.currentTestPhase === 'memo') {
            this.startTimer();
        } else if(this.currentTestPhase === 'recall') {
            this.totalTime = this.timeElapsed;
        }
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
        this.timeElapsed = `${minutes}:${seconds}`
        this.timerSubject$.next(this.timeElapsed);
    }
}