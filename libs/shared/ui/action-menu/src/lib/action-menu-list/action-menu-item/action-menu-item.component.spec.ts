import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMenuItemComponent } from './action-menu-item.component';

describe('ActionMenuItemComponent', () => {
  let component: ActionMenuItemComponent;
  let fixture: ComponentFixture<ActionMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionMenuItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
