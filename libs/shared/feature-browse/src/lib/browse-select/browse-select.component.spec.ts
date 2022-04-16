import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSelectComponent } from './browse-select.component';

describe('BrowseSelectComponent', () => {
  let component: BrowseSelectComponent;
  let fixture: ComponentFixture<BrowseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
