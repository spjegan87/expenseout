import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileGroupComponent } from './create-profile-group.component';

describe('CreateProfileGroupComponent', () => {
  let component: CreateProfileGroupComponent;
  let fixture: ComponentFixture<CreateProfileGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProfileGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfileGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
