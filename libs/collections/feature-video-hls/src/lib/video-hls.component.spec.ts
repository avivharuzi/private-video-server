import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHlsComponent } from './video-hls.component';

describe('VideoHlsComponent', () => {
  let component: VideoHlsComponent;
  let fixture: ComponentFixture<VideoHlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoHlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoHlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
