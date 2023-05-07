import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
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

  @ViewChild('input') input: ElementRef<any>;

  randomDigitsToMemorize: string;
  cellGroup: string;
  editable: boolean = false;

  constructor(public elementRef: ElementRef, public testPhaseService: TestPhaseService, private renderer: Renderer2){}

  ngOnInit(): void {
    this.randomDigitsToMemorize = Array.from({length: this.size}, () => Math.floor(Math.random() * 10)).join('');
    this.cellGroup = this.randomDigitsToMemorize;
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.style.width = this.cellGroup.length + 0.5 + 'ch';
    this.testPhaseService.testPhase$.pipe(
      tap((testPhase) => {
        this.editable = testPhase === 'recall'
        this.renderer.setStyle(this.input.nativeElement, 'caret-color', testPhase === 'recall' ? 'black' : 'transparent');
        if(testPhase === 'recall') {
          this.input.nativeElement.textContent = '';
        } else if(testPhase === 'summary') {
          this.checkMemorizedDigitsMatch()
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }

  onKeydown($event: KeyboardEvent) {
    const key = $event.key;
    if(Object.values(ArrowKeys).map((arrowKey => arrowKey as string)).includes(key)){
      this.arrowKeyPressed.emit({index: this.index, key: key as ArrowKeys})
    } else if(!this.editable || ignoreInput($event)){
      $event.preventDefault();
    }
  }

  private checkMemorizedDigitsMatch() {
    if (this.cellGroup == ''){
      this.cellGroup = this.randomDigitsToMemorize;
      this.renderer.setStyle(this.input.nativeElement, 'color', 'grey');
    } else if (this.randomDigitsToMemorize === this.cellGroup){
      this.renderer.setStyle(this.input.nativeElement, 'color', 'green');
    } else {

    }
  }
}

function ignoreInput($event): boolean {
  return !(['Backspace', 'Shift'].includes($event.key) || isDigit($event));
}

function isDigit($event): boolean {
  return 48 <= $event.keyCode && $event.keyCode <= 57 && /\d/.test($event.key);
}
