import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TestPhaseService } from 'src/app/services/test-phase.service';
import { InitPhaseConfig } from 'src/app/types/types';

@Component({
  selector: 'app-number-marathon-init-phase',
  templateUrl: './number-marathon-init-phase.component.html',
  styleUrls: ['./number-marathon-init-phase.component.css']
})
export class NumberMarathonInitPhaseComponent implements OnInit{

  readonly CELL_GROUP_WIDTH: string = 'cellGroupWidth';
  readonly CONCENTRATION_TIME: string = 'concentrationTime';
  readonly NUMBER_OF_CELL_GROUPS: string = 'numberOfCellGroups';

  static readonly DEFAULT_CELL_GROUP_WIDTH: number = 2;
  static readonly DEFAULT_CONCENTRATION_TIME: number = 3;
  static readonly DEFAULT_NUMBER_OF_CELL_GROUPS: number = 1500;

  numberMarathonForm: FormGroup;
  timeLeft: number = 0;

  @Output() startTest = new EventEmitter<InitPhaseConfig>();

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.numberMarathonForm = this.formBuilder.group({
      cellGroupWidth: NumberMarathonInitPhaseComponent.DEFAULT_CELL_GROUP_WIDTH,
      numberOfCellGroups: NumberMarathonInitPhaseComponent.DEFAULT_NUMBER_OF_CELL_GROUPS,
      concentrationTime: NumberMarathonInitPhaseComponent.DEFAULT_CONCENTRATION_TIME
    }); 
  }

  onSubmit(): void {
    this.timeLeft = this.numberMarathonForm.get(this.CONCENTRATION_TIME)?.value;
    this.concentrate();
  }

  private concentrate(): void {
    const intervalId = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        clearInterval(intervalId);
        this.startTestPhase();
      }
    }, 1000);
  }

  private startTestPhase(): void {
    const cellGroupWidth = this.numberMarathonForm.get(this.CELL_GROUP_WIDTH)?.value;
    const numberOfCellGroups = this.numberMarathonForm.get(this.NUMBER_OF_CELL_GROUPS)?.value;
    this.startTest.emit({cellGroupWidth, numberOfCellGroups});
  }
}

