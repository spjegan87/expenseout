import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAllowanceCreationComponent } from './create-allowance-creation.component';

describe('CreateAllowanceCreationComponent', () => {
  let component: CreateAllowanceCreationComponent;
  let fixture: ComponentFixture<CreateAllowanceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAllowanceCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAllowanceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
