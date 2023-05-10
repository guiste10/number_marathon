import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsComponent } from './instructions/insctructions.component';
import { ImagePracticeComponent } from './image-practice/image-practice.component';
import { NumberMarathonComponent } from './number-marathon/number-marathon.component';

const routes: Routes = [
  { path: 'number-marathon', component: NumberMarathonComponent },
  { path: 'image-practice', component: ImagePracticeComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: '**', redirectTo: 'number-marathon' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
