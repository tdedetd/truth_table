import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { LogicalExpression } from 'src/app/misc/logical-expression';
import { ExpressionService } from 'src/app/services/expression.service';
import { ExpressionInputComponent } from './expression-input.component';

describe('ExpressionInputComponent', () => {
  let component: ExpressionInputComponent;
  let fixture: ComponentFixture<ExpressionInputComponent>;

  const fakeExprService = {
    operatorInput$: of(),
    parse: (expr: LogicalExpression) => null 
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

  it('emits parsed expression after clicking "Compute" button', () => {
    component.expression = 'Av!B';
    spyOn(component.expressionChange, 'emit');

    // @ts-ignore
    spyOn(component.expr, 'parse').and.returnValue(new LogicalExpression(null, ['A']));

    const elem = fixture.nativeElement as HTMLElement;
    const btn = elem.querySelector('.btn') as HTMLButtonElement;
    btn.click();

    expect(component.expressionChange.emit).toHaveBeenCalledWith(new LogicalExpression(null, ['A']));
  });

  describe('should update expression after inserting char', () => {
    let textbox: HTMLInputElement;

    beforeEach(() => {
      textbox = component.textbox.nativeElement;
    });

    it('"A"', () => {
      textbox.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'A',
      }));
      expect(component.expression).toEqual('A');
    });

    it('"b"', () => {
      textbox.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'b',
      }));
      expect(component.expression).toEqual('B');
    });
  });

  describe("shouldn't update expression after inserting char", () => {
    let textbox: HTMLInputElement;

    beforeEach(() => {
      textbox = component.textbox.nativeElement;
    });

    ['1', ',', ' '].forEach(ch => {
      it(`"${ch}"`, () => {
        textbox.dispatchEvent(new KeyboardEvent('keydown', {
          key: ch,
        }));
        expect(component.expression).toEqual('');
      });
    });
  });
});
