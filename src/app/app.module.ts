import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExpressionInputComponent } from './components/expression-input/expression-input.component';
import { GuideComponent } from './components/guide/guide.component';
import { ExpressionService } from './services/expression.service';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpressionInputComponent,
    GuideComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    ExpressionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
