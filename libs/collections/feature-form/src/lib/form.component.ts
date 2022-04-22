import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize, tap } from 'rxjs';

import { CollectionsService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  isBrowseModalOpen = false;

  collectionForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    directories: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required]),
    ]),
  });

  selectedDirectoryIndex: number | null = null;

  isLoading = false;

  constructor(
    private readonly collectionService: CollectionsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  get directories(): FormArray {
    return this.collectionForm.get('directories') as FormArray;
  }

  addDirectory(): void {
    this.directories.push(this.formBuilder.control('', [Validators.required]));
  }

  removeDirectory(index: number): void {
    this.directories.removeAt(index);
  }

  openBrowse(event: Event, index: number): void {
    event.stopPropagation();

    this.selectedDirectoryIndex = index;

    this.isBrowseModalOpen = true;
  }

  onBrowseAdded(directory: string): void {
    if (this.selectedDirectoryIndex === null) {
      return;
    }

    this.directories.controls[this.selectedDirectoryIndex]?.setValue(directory);

    this.selectedDirectoryIndex = null;

    this.isBrowseModalOpen = false;
  }

  onSubmit(): void {
    if (this.collectionForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.collectionService
      .create(this.collectionForm.value)
      .pipe(
        tap((collection) => {
          this.router.navigate(['/collections', collection.id]).then();
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
