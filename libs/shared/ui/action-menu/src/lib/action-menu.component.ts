import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { createPopper, Placement, Instance as Popper } from '@popperjs/core';

import { ActionMenuDropdownDirective } from './action-menu-dropdown.directive';
import { ActionMenuOriginDirective } from './action-menu-origin.directive';

@Component({
  selector: 'shared-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuComponent implements AfterContentInit, OnDestroy {
  @Input() placement: Placement = 'bottom-start';

  @ContentChild(ActionMenuOriginDirective) origin!: ActionMenuOriginDirective;

  @ContentChild(ActionMenuDropdownDirective)
  dropdown!: ActionMenuDropdownDirective;

  private popper: Popper | null = null;

  private isOpen = false;

  private destroy = new Subject<void>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event']) click(event: MouseEvent) {
    if (
      !(this.elementRef.nativeElement as HTMLElement).contains(
        event.target as HTMLElement
      )
    ) {
      this.close();
    }
  }

  ngAfterContentInit(): void {
    this.origin.click$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.close();
  }

  open(): void {
    this.popper = createPopper(this.origin.element, this.dropdown.element, {
      placement: this.placement,
    });

    this.toggleDropdown();
  }

  close(): void {
    this.isOpen = false;
    this.popper && this.popper.destroy();
    this.toggleDropdown(false);
  }

  private toggleDropdown(show = true) {
    const display = show ? 'block' : 'none';
    this.renderer.setStyle(this.dropdown.element, 'display', display);
  }
}
