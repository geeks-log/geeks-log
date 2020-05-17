import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef } from '@angular/core';
import { ButtonBase } from './button-base';
export declare class ButtonComponent extends ButtonBase<HTMLButtonElement> {
    constructor(elementRef: ElementRef<HTMLButtonElement>, focusMonitor: FocusMonitor);
}
