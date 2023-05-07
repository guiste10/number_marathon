import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImagePracticeComponent } from './image-practice/image-practice.component';
import { AboutComponent } from './about/about.component';
import { NumberMarathonModule } from './number-marathon/number-marathon.module';
import { TestPhaseService } from './services/test-phase.service';
import { TestSummaryService } from './services/test-summary.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagePracticeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NumberMarathonModule
  ],
  providers: [TestPhaseService, TestSummaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
