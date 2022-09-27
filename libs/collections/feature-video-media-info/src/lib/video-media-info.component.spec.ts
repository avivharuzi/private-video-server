import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMediaInfoComponent } from './video-media-info.component';

describe('VideoMediaInfoComponent', () => {
  let component: VideoMediaInfoComponent;
  let fixture: ComponentFixture<VideoMediaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoMediaInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMediaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
