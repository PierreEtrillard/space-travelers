import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPannelComponent } from './selector-pannel.component';

describe('SelectorPannelComponent', () => {
  let component: SelectorPannelComponent;
  let fixture: ComponentFixture<SelectorPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorPannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
