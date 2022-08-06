import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVideoListComponent } from './search-video-list.component';

describe('SearchVideoListComponent', () => {
  let component: SearchVideoListComponent;
  let fixture: ComponentFixture<SearchVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVideoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
