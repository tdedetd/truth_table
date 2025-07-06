import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionService } from '../../services/expression.service';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  const fakeExpressionService = {};

  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [
        { provide: ExpressionService, useValue: fakeExpressionService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
