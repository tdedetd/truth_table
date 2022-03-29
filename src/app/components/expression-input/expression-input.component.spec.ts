import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionInputComponent } from './expression-input.component';

describe('ExpressionInputComponent', () => {
  let component: ExpressionInputComponent;
  let fixture: ComponentFixture<ExpressionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
