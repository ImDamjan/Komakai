import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTrackComponent } from './task-track.component';

describe('TaskTrackComponent', () => {
  let component: TaskTrackComponent;
  let fixture: ComponentFixture<TaskTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskTrackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
