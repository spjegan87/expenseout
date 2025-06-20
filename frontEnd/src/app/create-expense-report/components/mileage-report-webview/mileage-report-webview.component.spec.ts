import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageReportWebviewComponent } from './mileage-report-webview.component';

describe('MileageReportWebviewComponent', () => {
  let component: MileageReportWebviewComponent;
  let fixture: ComponentFixture<MileageReportWebviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MileageReportWebviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageReportWebviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
