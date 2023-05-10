import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImagePracticeComponent } from './image-practice/image-practice.component';
import { InstructionsComponent } from './instructions/insctructions.component';
import { NumberMarathonModule } from './number-marathon/number-marathon.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagePracticeComponent,
    InstructionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NumberMarathonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
