import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHeaderComponent } from './task-header.component';

describe('TaskHeaderComponent', () => {
  let component: TaskHeaderComponent;
  let fixture: ComponentFixture<TaskHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
