import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvancePolicyComponent } from './create-advance-policy.component';

describe('CreateAdvancePolicyComponent', () => {
  let component: CreateAdvancePolicyComponent;
  let fixture: ComponentFixture<CreateAdvancePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdvancePolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdvancePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
