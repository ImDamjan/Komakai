import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortProjectComponent } from './sort-project.component';

describe('SortProjectComponent', () => {
  let component: SortProjectComponent;
  let fixture: ComponentFixture<SortProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
