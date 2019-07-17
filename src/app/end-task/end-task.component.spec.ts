import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTaskComponent } from './end-task.component';

describe('EndTaskComponent', () => {
  let component: EndTaskComponent;
  let fixture: ComponentFixture<EndTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
