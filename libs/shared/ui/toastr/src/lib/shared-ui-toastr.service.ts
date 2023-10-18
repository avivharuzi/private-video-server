import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  Type,
} from '@angular/core';

import * as uuid from 'uuid';

import { sharedUiToastrDefaultMessageOptions } from './shared-ui-toastr-default-message-options';
import { SharedUiToastrMessageOptions } from './shared-ui-toastr-message-options';
import { ToastComponent } from './toast/toast.component';
import { ToastrContainerComponent } from './toastr-container/toastr-container.component';

@Injectable({
  providedIn: 'root',
})
export class SharedUiToastrService {
  private readonly renderer: Renderer2;

  private toastrContainerComponentRef: ComponentRef<ToastrContainerComponent> | null =
    null;

  private toasts = new Map<string, ComponentRef<ToastComponent>>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly rendererFactory: RendererFactory2,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.createToastrContainerComponentRef();
  }

  showSuccessMessage(
    content: string,
    options: Partial<SharedUiToastrMessageOptions> = {},
  ): string {
    return this.showMessage({
      color: 'success',
      content,
      ...options,
    });
  }

  showErrorMessage(
    content: string,
    options: Partial<SharedUiToastrMessageOptions> = {},
  ): string {
    return this.showMessage({
      color: 'error',
      content,
      ...options,
    });
  }

  showMessage(options: Partial<SharedUiToastrMessageOptions> = {}): string {
    const toastrContainerComponentRef = this.toastrContainerComponentRef;
    if (toastrContainerComponentRef === null) {
      throw new Error('Toastr container is not yet initialized!');
    }

    const mergedOptions = {
      ...sharedUiToastrDefaultMessageOptions,
      ...options,
    };

    const id = `toastr-${uuid.v4()}`;

    const componentRef = this.createComponent(ToastComponent);
    componentRef.instance.id = id;
    componentRef.instance.color = mergedOptions.color;
    componentRef.instance.hasIcon = mergedOptions.hasIcon;
    componentRef.instance.hasClose = mergedOptions.hasClose;
    componentRef.instance.content = mergedOptions.content;
    componentRef.instance.templateContent = mergedOptions.templateContent;

    this.attachComponent(
      componentRef,
      toastrContainerComponentRef.instance.items.nativeElement,
    );

    this.toasts.set(id, componentRef);

    setTimeout(() => {
      this.closeMessage(id);
    }, mergedOptions.timeout);

    return id;
  }

  closeMessage(id: string): void {
    if (!this.toasts.has(id)) {
      return;
    }

    const toast = this.toasts.get(id);
    if (!toast) {
      return;
    }

    this.removeComponent(toast);
    this.toasts.delete(id);
  }

  private createToastrContainerComponentRef(): void {
    this.toastrContainerComponentRef = this.createComponent(
      ToastrContainerComponent,
    );

    this.attachComponent(this.toastrContainerComponentRef, this.document.body);
  }

  private createComponent<T>(
    component: Type<T>,
    componentProps?: T,
  ): ComponentRef<T> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    if (componentProps && typeof componentRef.instance === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.assign(componentRef.instance, componentProps);
    }

    return componentRef;
  }

  private attachComponent<T>(
    componentRef: ComponentRef<T>,
    appendTo: Element,
  ): void {
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>)
      .rootNodes[0] as HTMLElement;

    this.renderer.appendChild(appendTo, domElem);

    return;
  }

  private removeComponent<T>(componentRef: ComponentRef<T>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
