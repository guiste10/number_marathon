import { Injectable } from "@angular/core";
import { map, Observable, ReplaySubject, Subject, tap } from "rxjs";
import { getNextPhase, TestPhase } from 'src/app/types/types';
import { TestTimerService } from "./test-timer.service";

@Injectable()
export class TestPhaseService {
    private testPhaseSubject$: ReplaySubject<TestPhase> = new ReplaySubject(1)
    private currentTestPhase: TestPhase;

    constructor(private testTimerService: TestTimerService) {
        this.testPhaseSubject$ = new ReplaySubject(1);
    }

    get testPhase$(): Observable<TestPhase> {
        return this.testPhaseSubject$.asObservable();
    }

    
    nextTestPhase(nextPhase?: TestPhase): void{
        this.currentTestPhase = nextPhase ?? getNextPhase(this.currentTestPhase);
        this.testPhaseSubject$.next(this.currentTestPhase)
        if (this.currentTestPhase === 'memo') {
            this.testTimerService.startTimer();
        } else if(this.currentTestPhase === 'recall') {
            this.testTimerService.stopTimer();
        }
    }
}