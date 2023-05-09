import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-marathon-init-phase',
  templateUrl: './number-marathon-init-phase.component.html',
  styleUrls: ['./number-marathon-init-phase.component.css']
})
export class NumberMarathonInitPhaseComponent implements OnInit{

  readonly CELL_GROUP_WIDTH: string = 'cellGroupWidth';
  readonly CONCENTRATION_TIME: string = 'concentrationTime';

  static readonly DEFAULT_CELL_GROUP_WIDTH: number = 2;
  static readonly DEFAULT_CONCENTRATION_TIME: number = 1;

  numberMarathonForm: FormGroup;
  timeLeft: number = 0;

  @Output() startTest = new EventEmitter<string>();

  constructor(    
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.numberMarathonForm = this.formBuilder.group({
      cellGroupWidth: NumberMarathonInitPhaseComponent.DEFAULT_CELL_GROUP_WIDTH,
      concentrationTime: NumberMarathonInitPhaseComponent.DEFAULT_CONCENTRATION_TIME
    }); 
  }

  onSubmit(): void {
    this.timeLeft = this.numberMarathonForm.get(this.CONCENTRATION_TIME)?.value;
    this.concentrate();
  }

  concentrate() {
    const intervalId = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        clearInterval(intervalId);
        this.startTestPhase();
      }
    }, 1000);
  }

  startTestPhase() {
    const cellGroupWidth: string = this.numberMarathonForm.get(this.CELL_GROUP_WIDTH)?.value;
    this.startTest.emit(cellGroupWidth);
  }
}

