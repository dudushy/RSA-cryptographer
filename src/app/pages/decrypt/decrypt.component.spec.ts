import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptComponent } from './decrypt.component';

describe('DecryptComponent', () => {
  let component: DecryptComponent;
  let fixture: ComponentFixture<DecryptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecryptComponent]
    });
    fixture = TestBed.createComponent(DecryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
