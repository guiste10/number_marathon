import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class TestTimerService {
    private startTime: number;
    private timerSubject$ = new BehaviorSubject('00:00');
    private timerId: NodeJS.Timer;

    get time(): string {
        return this.timerSubject$.value;
    }

    get timer$(): Observable<string> {
        return this.timerSubject$.asObservable();
    }

    startTimer(): void {
        this.startTime = Date.now();
        this.timerId = setInterval(() => {
          this.updateTimer();
        }, 1000);
    }

    stopTimer(): void {
        clearInterval(this.timerId);
    }

    private updateTimer(): void {
        const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
        const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
        this.timerSubject$.next( `${minutes}:${seconds}`);
    }
}