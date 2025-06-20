import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavLoaderComponent } from './topnav-loader.component';

describe('TopnavLoaderComponent', () => {
  let component: TopnavLoaderComponent;
  let fixture: ComponentFixture<TopnavLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopnavLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
