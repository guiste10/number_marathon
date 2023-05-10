import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, ReplaySubject, shareReplay, Subject, tap } from "rxjs";
import { getNextPhase, TestPhase } from 'src/app/types/types';
import { TestTimerService } from "./test-timer.service";

@Injectable()
export class TestPhaseService {
    private testPhaseSubject$: BehaviorSubject<TestPhase> = new BehaviorSubject('new');
    private currentTestPhase: TestPhase = 'new';

    constructor(private testTimerService: TestTimerService) {}

    get testPhase$(): Observable<TestPhase> {
        return this.testPhaseSubject$.asObservable().pipe(
            shareReplay(1)
        );
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