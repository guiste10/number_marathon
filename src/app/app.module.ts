import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImagePracticeComponent } from './image-practice/image-practice.component';
import { AboutComponent } from './about/about.component';
import { NumberMarathonModule } from './number-marathon/number-marathon.module';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
