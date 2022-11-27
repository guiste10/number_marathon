import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell-group',
  templateUrl: './cell-group.component.html',
  styleUrls: ['./cell-group.component.css']
})
export class CellGroupComponent implements OnInit{

  @Input() size: number;
  cellGroup: string;

  ngOnInit(): void {
    this.cellGroup = Array.from({length: this.size}, () => Math.floor(Math.random() * 10)).join('');
  }

}
