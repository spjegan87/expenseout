import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpPageComponent } from './jump-page.component';

describe('JumpPageComponent', () => {
  let component: JumpPageComponent;
  let fixture: ComponentFixture<JumpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JumpPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JumpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
