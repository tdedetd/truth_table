import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { ExpressionService } from 'src/app/services/expression.service';
import { GuideComponent } from './guide.component';

describe('GuideComponent', () => {
  const fakeExpressionService = {
    operatorInput$: new Subject()
  };

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

  it('emits char after clickng operation button', () => {
    // @ts-ignore
    spyOn(component.expr.operatorInput$, 'next');

    const elem = fixture.nativeElement as HTMLElement;
    const button = elem.querySelector('li button') as HTMLButtonElement;
    button.click();

    // @ts-ignore
    expect(component.expr.operatorInput$.next).toHaveBeenCalledWith('!');
  });
});
