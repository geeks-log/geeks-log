import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ElementRef, Input, OnDestroy } from '@angular/core';
import { BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP, BUTTON_HOST_ATTRIBUTES, ButtonColor } from './types';

export abstract class ButtonBase<T extends HTMLElement> implements OnDestroy {
  protected constructor(protected elementRef: ElementRef<T>, protected focusMonitor: FocusMonitor) {
    this.hostElement.classList.add('Button');

    // For each of the variant selectors that is prevent in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        this.hostElement.classList.add(BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP[attr]);
      }
    }

    this.focusMonitor.monitor(this.elementRef, true);
  }

  protected _color: ButtonColor;

  @Input()
  get color(): ButtonColor {
    return this._color;
  }

  set color(color: ButtonColor) {
    this.updateColorClassName(color);
  }

  get hostElement(): T {
    return this.elementRef.nativeElement;
  }

  ngOnDestroy() {
    this.focusMonitor.ngOnDestroy();
  }

  focus(origin: FocusOrigin = 'program', options?: FocusOptions) {
    this.focusMonitor.focusVia(this.elementRef, origin, options);
  }

  protected updateColorClassName(color: ButtonColor): void {
    const hostEl = this.hostElement;

    if (this._color) {
      const previousColorClassName = `Button--color-${this._color}`;

      // Remove previous button color class.
      if (hostEl.classList.contains(previousColorClassName)) {
        hostEl.classList.remove(previousColorClassName);
      }
    }

    if (color != null) {
      const nextClassName = `Button--color-${color}`;
      hostEl.classList.add(nextClassName);
    }

    this._color = color;
  }

  private hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) => this.hostElement.hasAttribute(attribute));
  }
}
