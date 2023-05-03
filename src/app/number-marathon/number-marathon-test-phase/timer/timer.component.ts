import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit {
  timer = '00:00';
  private startTime: number;

  ngOnInit() {
    this.startTime = Date.now();
    setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
    this.timer = `${minutes}:${seconds}`;
  }
}