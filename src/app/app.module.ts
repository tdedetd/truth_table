import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExpressionInputComponent } from './components/expression-input/expression-input.component';
import { GuideComponent } from './components/guide/guide.component';
import { TableComponent } from './components/table/table.component';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { OPERATOR_INPUT_TOKEN } from './tokens/operator-input.token';
import { Subject } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpressionInputComponent,
    GuideComponent,
    TableComponent,
    ToNumberPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    { provide: OPERATOR_INPUT_TOKEN, useValue: new Subject() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
