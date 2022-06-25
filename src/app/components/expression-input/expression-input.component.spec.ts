import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ExpressionService } from 'src/app/services/expression.service';
import { ExpressionInputComponent } from './expression-input.component';

describe('ExpressionInputComponent', () => {
  let component: ExpressionInputComponent;
  let fixture: ComponentFixture<ExpressionInputComponent>;

  const fakeExprService = {
    operatorInput$: of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionInputComponent ],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: ExpressionService, useValue: fakeExprService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update expression after inserting char "A"', () => {
    
  });
});
