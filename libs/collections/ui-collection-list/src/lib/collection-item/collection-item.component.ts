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
  Collection,
  CollectionsService,
} from '@private-video-server/collections/data-access';
import { ActionMenuComponent } from '@private-video-server/shared/ui/action-menu';
import { SharedUiToastrService } from '@private-video-server/shared/ui/toastr';

@Component({
  selector: 'collections-collection-item[collection]',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionItemComponent {
  @Input() collection!: Collection;

  @Output() collectionDeleted = new EventEmitter<void>();

  isLoading = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly collectionService: CollectionsService,
    private readonly sharedUiToastrService: SharedUiToastrService,
  ) {}

  onRefresh(sharedActionMenu: ActionMenuComponent): void {
    sharedActionMenu.close();

    this.isLoading = true;

    this.collectionService
      .refresh(this.collection.id)
      .pipe(
        tap((collection) => {
          this.sharedUiToastrService.showSuccessMessage(
            `Collection "${collection.name}" was refreshed successfully`,
          );
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

    this.collectionService
      .delete(this.collection.id)
      .pipe(
        tap((collection) => {
          this.sharedUiToastrService.showSuccessMessage(
            `Collection "${collection.name}" was deleted successfully`,
          );

          this.collectionDeleted.emit();
        }),
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe();
  }
}
