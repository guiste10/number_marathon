import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TestPhaseService } from 'src/app/services/test-phase.service';
import { ArrowKeys, TestPhase } from 'src/app/types/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-cell-group',
  templateUrl: './cell-group.component.html',
  styleUrls: ['./cell-group.component.css']
})
export class CellGroupComponent implements OnInit, AfterViewInit{

  @Input() size: number;
  @Input() index: number;

  @Output() arrowKeyPressed = new EventEmitter<{index: number, key: ArrowKeys}>();

  @ViewChild('input') input: ElementRef;

  randomDigitsToMemorize: string;
  cellGroup: string;

  constructor(public elementRef: ElementRef, public testPhaseService: TestPhaseService){
    this.testPhaseService.testPhase$.pipe(
      tap((testPhase) => {
        if(testPhase === 'recall') {
          this.cellGroup = '';
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }

  ngOnInit(): void {
    this.randomDigitsToMemorize = Array.from({length: this.size}, () => Math.floor(Math.random() * 10)).join('');
    this.cellGroup = this.randomDigitsToMemorize;
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.style.width = this.cellGroup.length + 1 + 'ch';
  }

  onKeydown($event: KeyboardEvent) {
    const key = $event.key;
    if(Object.values(ArrowKeys).map((arrowKey => arrowKey as string)).includes(key)){
      this.arrowKeyPressed.emit({index: this.index, key: key as ArrowKeys})
    }
  }
}
