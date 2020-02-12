import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditpostComponent } from './addeditpost.component';

describe('AddeditpostComponent', () => {
  let component: AddeditpostComponent;
  let fixture: ComponentFixture<AddeditpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
