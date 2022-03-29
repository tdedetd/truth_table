import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExpressionInputComponent } from './components/expression-input/expression-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpressionInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
