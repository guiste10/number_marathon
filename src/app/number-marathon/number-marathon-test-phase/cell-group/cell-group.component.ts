import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { TestPhaseService } from 'src/app/services/test-phase.service';
import { ArrowKeys, TestPhase } from 'src/app/types/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TestResultSummaryService } from 'src/app/services/test-result-summary.service';

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
  editAllowed: boolean = false;

  constructor(
    public elementRef: ElementRef, 
    public testPhaseService: TestPhaseService, 
    private renderer: Renderer2,
    private testResultSummaryService: TestResultSummaryService){}

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
    this.editAllowed = recallPhase;
    this.renderer.setStyle(this.input.nativeElement, 'caret-color', recallPhase ? 'black' : 'transparent');
    if (recallPhase) {
      this.input.nativeElement.textContent = ''; 
    } else if(testPhase === 'result') {
      this.testResultSummaryService.checkMemorizedDigitsMatch(this.input.nativeElement, this.cellGroupToMemorize);
    }
  }

  onKeydown($event: KeyboardEvent) {
    if (isArrowKey($event)){
      this.arrowKeyPressed.emit({index: this.index, key: $event.key as ArrowKeys})
    } else if(shouldIgnoreInput($event, this.editAllowed)){
      $event.preventDefault();
    } else if(shouldFocusNextElementAfterInput($event, this.input.nativeElement, this.size)){
      setTimeout(() => this.arrowKeyPressed.emit({index: this.index, key: ArrowKeys.Right}));
    }
  }
}

function shouldFocusNextElementAfterInput($event: KeyboardEvent, input: HTMLDivElement, size: number): boolean{
  return isDigit($event) && input.textContent.length == size - 1;
}

function isArrowKey($event: KeyboardEvent): boolean {
  return Object.values(ArrowKeys).map((arrowKey => arrowKey as string)).includes($event.key);
}

function shouldIgnoreInput($event: KeyboardEvent, editAllowed: boolean): boolean {
  return !editAllowed || !(['Backspace', 'Shift'].includes($event.key) || isDigit($event));
}

function isDigit($event: KeyboardEvent): boolean {
  return 48 <= $event.keyCode && $event.keyCode <= 57 && /\d/.test($event.key);
}