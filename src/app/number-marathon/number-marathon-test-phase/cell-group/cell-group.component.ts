import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ArrowKeys } from 'src/app/types/types';

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

  cellGroup: string;

  constructor(public elementRef: ElementRef){}

  ngOnInit(): void {
    this.cellGroup = Array.from({length: this.size}, () => Math.floor(Math.random() * 10)).join('');
  }

  ngAfterViewInit(): void {
    const input = this.input.nativeElement;
    input.style.width = input.value.length + 1 + 'ch';
    if(input){
      input.addEventListener('input', function() {
        this.style.width = this.value.length + 1 + 'ch';
      })
    }
  }

  onKeydown($event: KeyboardEvent) {
    const key = $event.key;
    console.log('pressed: ' + $event.key);
    if(Object.values(ArrowKeys).map((arrowKey => arrowKey as string)).includes(key)){
      this.arrowKeyPressed.emit({index: this.index, key: key as ArrowKeys})
    }
  }
}
