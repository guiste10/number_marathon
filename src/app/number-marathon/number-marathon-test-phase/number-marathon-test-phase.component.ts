import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { TestPhaseService } from 'src/app/services/test-phase.service';
import { ArrowKeys, InitPhaseConfig } from 'src/app/types/types';
import { CellGroupComponent } from './cell-group/cell-group.component';

@UntilDestroy()
@Component({
  selector: 'app-number-marathon-test-phase',
  templateUrl: './number-marathon-test-phase.component.html',
  styleUrls: ['./number-marathon-test-phase.component.css']
})
export class NumberMarathonTestPhaseComponent implements AfterViewInit{

  @Input() initPhaseConfig: InitPhaseConfig;

  @ViewChildren('appCellGroup') appCellGroups: QueryList<CellGroupComponent>;
  
  numInputsPerRow: number;
  cellGroups: CellGroupComponent[];

  constructor(public testPhaseService: TestPhaseService){}

  ngAfterViewInit() {
    this.testPhaseService.testPhase$.pipe(
      tap((_) => this.appCellGroups.first.input.nativeElement.focus()),
      untilDestroyed(this)
    ).subscribe();
    this.appCellGroups.first.input.nativeElement.focus();
    this.numInputsPerRow = this.getNumInputsPerRow();
    this.cellGroups = this.appCellGroups.toArray()
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getNumInputsPerRow(): number {
    let rowTop = -1;
    let numElementsPerRow = 0;
    const elements = this.appCellGroups.map((appCellGroup) => appCellGroup.elementRef.nativeElement);
    for (let i = 0; i < elements.length; i++) {
      const rect = elements[i].getBoundingClientRect();
      const isOnSameRow = rowTop === -1 || rowTop === rect.top;
      if (!isOnSameRow) {
        return numElementsPerRow;
      }
      numElementsPerRow++;
      rowTop = rect.top;
    }
    return 0;
  }

  arrowPressed(params: {index: number, key: ArrowKeys}): void {
    const { index, key } = params;
    let elementToFocus: CellGroupComponent;
    if (ArrowKeys.Right === key) {
      elementToFocus = this.cellGroups[index + 1];
    } else if(ArrowKeys.Left === key) {
      elementToFocus = this.cellGroups[index - 1];
    } else if(ArrowKeys.Up === key) {
      elementToFocus = this.cellGroups[index - this.numInputsPerRow];
    } else if(ArrowKeys.Down === key) {
      elementToFocus = this.cellGroups[index + this.numInputsPerRow];
    }
    if (elementToFocus) {
      elementToFocus.input.nativeElement.focus();
    }
  }
}