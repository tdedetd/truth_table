import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionService } from 'src/app/services/expression.service';
import { GuideComponent } from './guide.component';

describe('GuideComponent', () => {
  const fakeExpressionService = {};

  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideComponent ],
      providers: [
        { provide: ExpressionService, useValue: fakeExpressionService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
