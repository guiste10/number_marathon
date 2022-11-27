import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ImagePracticeComponent } from './image-practice/image-practice.component';
import { NumberMarathonInitPhaseComponent } from './number-marathon/number-marathon-init-phase/number-marathon-init-phase.component';

const routes: Routes = [
  { path: 'number-marathon', component: NumberMarathonInitPhaseComponent },
  { path: 'image-practice', component: ImagePracticeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'number-marathon' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
