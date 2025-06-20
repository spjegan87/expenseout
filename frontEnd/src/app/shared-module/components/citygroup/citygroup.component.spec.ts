import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitygroupComponent } from './citygroup.component';

describe('CitygroupComponent', () => {
  let component: CitygroupComponent;
  let fixture: ComponentFixture<CitygroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitygroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
