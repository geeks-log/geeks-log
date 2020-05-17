import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy } from '@angular/core';
import { ButtonColor } from './types';
export declare abstract class ButtonBase<T extends HTMLElement> implements OnDestroy {
    protected elementRef: ElementRef<T>;
    protected focusMonitor: FocusMonitor;
    protected constructor(elementRef: ElementRef<T>, focusMonitor: FocusMonitor);
    protected _color: ButtonColor;
    get color(): ButtonColor;
    set color(color: ButtonColor);
    get hostElement(): T;
    ngOnDestroy(): void;
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    protected updateColorClassName(color: ButtonColor): void;
    private hasHostAttributes;
}
