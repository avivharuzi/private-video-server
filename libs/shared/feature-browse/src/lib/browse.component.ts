import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import {
  BrowseDirectory,
  BrowseService,
} from '@private-video-server/shared/data-access-browse';

import { BrowseData } from './browse-data';

@Component({
  selector: 'shared-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit {
  path = '';

  private browseDataBehaviorSubject = new BehaviorSubject<BrowseData | null>(
    null
  );

  browseData$ = this.browseDataBehaviorSubject.asObservable();

  @Output() added = new EventEmitter<string>();

  @Output() cancelled = new EventEmitter<void>();

  constructor(private readonly browseService: BrowseService) {}

  ngOnInit(): void {
    this.browseService.getAll().subscribe((browse) => {
      this.updateBrowseData({
        root: browse,
      });

      if (browse.directories.length > 0 && browse.directories[0]) {
        this.updateCurrent(browse.directories[0]);
      }
    });
  }

  updateCurrent(currentDirectory: BrowseDirectory, isBack = false): void {
    this.path = currentDirectory.path;

    const browseDataValue = this.getBrowseDataValue();

    const root = browseDataValue?.root;
    let history = [...(browseDataValue?.history || [])];
    let currentRootDirectory = browseDataValue?.currentRootDirectory;

    const isCurrentDirectoryBelongToRoot =
      root?.directories.includes(currentDirectory);

    if (isCurrentDirectoryBelongToRoot) {
      history = [currentDirectory];
      currentRootDirectory = currentDirectory;
    } else if (isBack) {
      history = history.filter(
        (historyItem) => historyItem !== currentDirectory
      );
    } else {
      history = [...history, currentDirectory];
    }

    this.browseService.getAll(this.path).subscribe((current) => {
      this.updateBrowseData({
        current,
        currentRootDirectory,
        currentDirectory,
        isCurrentDirectoryBelongToRoot,
        history,
      });
    });
  }

  back(): void {
    const history = this.getBrowseDataValue()?.history || [];
    const path = history[history.length - 2];
    if (path) {
      this.updateCurrent(path, true);
    }
  }

  onCancel(event: Event): void {
    event.stopPropagation();

    this.cancelled.emit();
  }

  onAdd(event: Event): void {
    event.stopPropagation();

    this.added.emit(this.path);
  }

  private updateBrowseData(browseData: BrowseData): void {
    this.browseDataBehaviorSubject.next({
      ...this.getBrowseDataValue(),
      ...browseData,
    });
  }

  private getBrowseDataValue(): BrowseData | null {
    return this.browseDataBehaviorSubject.value;
  }
}
