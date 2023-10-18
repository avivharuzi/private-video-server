import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMenuListComponent } from './action-menu-list.component';

describe('ActionMenuListComponent', () => {
  let component: ActionMenuListComponent;
  let fixture: ComponentFixture<ActionMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionMenuListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
