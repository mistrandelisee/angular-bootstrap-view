import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToatComponent } from './toat.component';

describe('ToatComponent', () => {
  let component: ToatComponent;
  let fixture: ComponentFixture<ToatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
