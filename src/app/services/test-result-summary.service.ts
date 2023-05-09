import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, map, Observable, ReplaySubject, shareReplay, Subject, take, tap} from "rxjs";
import { DigitColor, TestSummary } from "../types/types";

@Injectable()
export class TestResultSummaryService {
    testSummary$: Observable<TestSummary>;
    private renderer: Renderer2;

    private testSummarySubject$ = new BehaviorSubject<TestSummary>({redCount: 0, greenCount: 0});

    constructor(private rendererFactory: RendererFactory2) {
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

    addDigitToResultSummary(color: DigitColor): void {
        this.testSummarySubject$.pipe(
            take(1),
            tap((testSummary) => {
                const newSummary = color === 'red' 
                ? {...testSummary, redCount: testSummary.redCount + 1} 
                : {...testSummary, greenCount: testSummary.greenCount+1};
                this.testSummarySubject$.next(newSummary);
            })
        ).subscribe();
    }
}