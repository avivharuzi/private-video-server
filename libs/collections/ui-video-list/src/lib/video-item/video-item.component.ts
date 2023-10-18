import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { finalize, tap } from 'rxjs';

import {
  Video,
  VideosService,
} from '@private-video-server/collections/data-access';
import { ActionMenuComponent } from '@private-video-server/shared/ui/action-menu';
import { SharedUiToastrService } from '@private-video-server/shared/ui/toastr';

@Component({
  selector: 'collections-video-item[video]',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoItemComponent {
  @Input() video!: Video;

  @Output() videoDeleted = new EventEmitter<void>();

  hasVideoPreview = false;
  isLoading = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly videosService: VideosService,
    private readonly sharedUiToastrService: SharedUiToastrService,
  ) {}

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0] as File;

    this.isLoading = true;

    this.videosService
      .changeCoverThumbnail(this.video.id, file)
      .pipe(
        tap((updatedVideo) => {
          this.sharedUiToastrService.showSuccessMessage(
            `Video "${updatedVideo.title}" was updated the cover thumbnail successfully`,
          );

          this.video = updatedVideo;
        }),
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe();
  }

  onDelete(sharedActionMenu: ActionMenuComponent): void {
    sharedActionMenu.close();

    this.isLoading = true;

    this.videosService
      .delete(this.video.id)
      .pipe(
        tap((deleteVideo) => {
          this.sharedUiToastrService.showSuccessMessage(
            `Video "${deleteVideo.title}" was deleted successfully`,
          );

          this.videoDeleted.emit();
        }),
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe();
  }
}
