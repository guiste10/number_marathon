import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-marathon',
  templateUrl: './number-marathon.component.html',
  styleUrls: ['./number-marathon.component.css']
})
export class NumberMarathonComponent implements OnInit{

  isInitMode: boolean = true;
  cellGroupWidth: number;

  ngOnInit(): void {
    
  }

  startTest($event: any) {
    this.cellGroupWidth = $event;
    this.isInitMode = false;
  }

}
