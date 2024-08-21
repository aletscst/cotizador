import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimFormComponent } from './sim-form.component';

describe('SimFormComponent', () => {
  let component: SimFormComponent;
  let fixture: ComponentFixture<SimFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
