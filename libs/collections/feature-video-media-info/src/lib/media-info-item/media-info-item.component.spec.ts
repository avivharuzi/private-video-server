import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInfoItemComponent } from './media-info-item.component';

describe('MediaInfoItemComponent', () => {
  let component: MediaInfoItemComponent;
  let fixture: ComponentFixture<MediaInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaInfoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
