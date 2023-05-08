import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
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

  @ViewChild('input') input: ElementRef<HTMLDivElement>;

  cellGroupToMemorize: string;
  cellGroup: string;
  editable: boolean = false;

  constructor(public elementRef: ElementRef, public testPhaseService: TestPhaseService, private renderer: Renderer2){}

  ngOnInit(): void {
    this.cellGroupToMemorize = Array.from({length: this.size}, () => Math.floor(Math.random() * 10)).join('');
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.style.width = this.cellGroupToMemorize.length + 0.5 + 'ch';
    this.testPhaseService.testPhase$.pipe(
      tap((testPhase) => this.handleTestPhaseChange(testPhase)),
      untilDestroyed(this)
    ).subscribe();
  }

  private handleTestPhaseChange(testPhase: TestPhase){
    const recallPhase = testPhase === 'recall';
    this.editable = recallPhase;
    this.renderer.setStyle(this.input.nativeElement, 'caret-color', recallPhase ? 'black' : 'transparent');
    if (recallPhase) {
      this.clearInputContentAndSpans(); 
    } else if(testPhase === 'result') {
      this.checkMemorizedDigitsMatch();
    }
  }

  onKeydown($event: KeyboardEvent) {
    if (isArrowKey($event)){
      this.arrowKeyPressed.emit({index: this.index, key: $event.key as ArrowKeys})
    } else if(!this.editable || ignoreInput($event)){
      $event.preventDefault();
    }
  }

  private checkMemorizedDigitsMatch() {
    const memorizedDigits = this.input.nativeElement.textContent ?? '';
    this.clearInputContentAndSpans();
    var digit: string;
    var color: string;
    for (var i = 0; i < this.cellGroupToMemorize.length; i++) {
      if (i < memorizedDigits.length){
        digit = memorizedDigits[i];
        color = memorizedDigits[i] === this.cellGroupToMemorize[i] ? 'green' : 'red';
      } else {
        digit = this.cellGroupToMemorize[i];
        color = 'grey';
      }
      const spanElement = this.renderer.createElement('span');
      this.renderer.setProperty(spanElement, 'textContent', digit);
      this.renderer.setStyle(spanElement, 'color', color);
      this.renderer.appendChild(this.input.nativeElement, spanElement);
    }
  }

  private clearInputContentAndSpans(): void{
    this.input.nativeElement.textContent = ''; 
  }
}

function isArrowKey($event: KeyboardEvent): boolean {
  return Object.values(ArrowKeys).map((arrowKey => arrowKey as string)).includes($event.key);
}

function ignoreInput($event: KeyboardEvent): boolean {
  return !(['Backspace', 'Shift'].includes($event.key) || isDigit($event));
}

function isDigit($event: KeyboardEvent): boolean {
  return 48 <= $event.keyCode && $event.keyCode <= 57 && /\d/.test($event.key);
}