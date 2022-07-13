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

  describe('should update expression', () => {
    let textbox: HTMLInputElement;

    beforeEach(() => {
      textbox = component.textbox.nativeElement;
    });

    it('after inserting char "A"', () => {
      textbox.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'A',
      }));
      expect(component.expression).toEqual('A');
    });

    it('after inserting char "b"', () => {
      textbox.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'b',
      }));
      expect(component.expression).toEqual('B');
    });
  });
});
