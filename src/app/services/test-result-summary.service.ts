import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, Observable, shareReplay} from "rxjs";
import { BestScore, DigitColor, TestSummary, TimedTestSummary } from "../types/types";
import Cookies from 'js-cookie';
import { TestPhaseService } from "./test-phase.service";
import { TestTimerService } from "./test-timer.service";

@Injectable()
export class TestResultSummaryService {
    testSummary$: Observable<TestSummary>;

    private renderer: Renderer2;
    private initialTestSummaryValue = {redCount: 0, greenCount: 0};
    private testSummarySubject$ = new BehaviorSubject<TestSummary>(this.initialTestSummaryValue);

    constructor(private rendererFactory: RendererFactory2, private testTimerService: TestTimerService) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        this.testSummary$ = this.testSummarySubject$.asObservable().pipe(shareReplay(1));
    }

    checkMemorizedDigitsMatch(editableComponent: HTMLDivElement, cellGroupToMemorize: string): void {
        const memorizedDigits = editableComponent.textContent ?? '';
        editableComponent.textContent = ''; 
        var digit: string, color: DigitColor;
        for (var i = 0; i < cellGroupToMemorize.length; i++) {
          if (i < memorizedDigits.length){
            digit = memorizedDigits[i];
            color = memorizedDigits[i] === cellGroupToMemorize[i] ? 'green' : 'red';
            this.addDigitToResultSummary(color);
          } else {
            digit = cellGroupToMemorize[i];
            color = 'grey';
          }
          const spanElement = this.renderer.createElement('span');
          this.renderer.setProperty(spanElement, 'textContent', digit);
          this.renderer.setStyle(spanElement, 'color', color);
          this.renderer.appendChild(editableComponent, spanElement);
        }
    }

    saveAndGetBestScore(): BestScore {
        const currentScore = this.testSummarySubject$.value.greenCount;
        const currentTotalTime = this.testTimerService.time;
        const storedBestScore = Cookies.get('bestScore')
        if( !storedBestScore || currentScore > storedBestScore) {
            Cookies.set('bestScore', currentScore, { expires: 3650 });
            Cookies.set('bestScoreTime', currentTotalTime, { expires: 3650 })
            return {greenCount: currentScore, totalTime: currentTotalTime};
        }
        const storedBestScoreTime = Cookies.get('bestScoreTime');
        return {greenCount: storedBestScore, totalTime: storedBestScoreTime}
    }

    getTimedScoreSummary(): TimedTestSummary{
        return {...this.testSummarySubject$.value, totalTime: this.testTimerService.time};
    }

    resetSummary(): void {
        this.testSummarySubject$.next(this.initialTestSummaryValue);
    }

    private addDigitToResultSummary(color: DigitColor): void {
        const testSummary: TestSummary = this.testSummarySubject$.value;
        const testSummaryNew =  color === 'red' 
            ? {...testSummary, redCount: testSummary.redCount + 1} 
            : {...testSummary, greenCount: testSummary.greenCount + 1};
        this.testSummarySubject$.next(testSummaryNew)
    }
}