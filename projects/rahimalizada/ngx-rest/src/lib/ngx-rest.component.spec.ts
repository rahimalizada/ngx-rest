import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRestComponent } from './ngx-rest.component';

describe('NgxRestComponent', () => {
  let component: NgxRestComponent;
  let fixture: ComponentFixture<NgxRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
