import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cell-group',
  templateUrl: './cell-group.component.html',
  styleUrls: ['./cell-group.component.css']
})
export class CellGroupComponent implements OnInit, AfterViewInit{

  @Input() size: number;
  @ViewChild('input') input: ElementRef;

  cellGroup: string;

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

}
