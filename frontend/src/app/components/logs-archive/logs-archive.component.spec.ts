import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsArchiveComponent } from './logs-archive.component';

describe('LogsArchiveComponent', () => {
  let component: LogsArchiveComponent;
  let fixture: ComponentFixture<LogsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
