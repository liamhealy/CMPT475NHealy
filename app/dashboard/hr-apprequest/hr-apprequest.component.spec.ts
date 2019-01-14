import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRAppRequestComponent } from './hr-apprequest.component';

describe('HRAppRequestComponent', () => {
  let component: HRAppRequestComponent;
  let fixture: ComponentFixture<HRAppRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRAppRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRAppRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
