import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject} from "rxjs";

@Injectable()
export class TestSummaryService {
    wrongDigits$: Observable<number>;

    private wrongDigitsSubject$: Subject<number>;

    constructor() {
        this.wrongDigitsSubject$ = new ReplaySubject(1);
        this.wrongDigits$ = this.wrongDigitsSubject$.asObservable();
    }

    
    reportWrongDigits(numWrongDigits: number): void{
        
    }
}