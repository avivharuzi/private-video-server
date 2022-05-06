import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastrContainerComponent } from './toastr-container.component';

describe('ToastrContainerComponent', () => {
  let component: ToastrContainerComponent;
  let fixture: ComponentFixture<ToastrContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastrContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastrContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
