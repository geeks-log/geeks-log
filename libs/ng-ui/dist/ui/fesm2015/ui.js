import { __decorate } from 'tslib';
import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { Input, ElementRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const BUTTON_HOST_ATTRIBUTES = ['ui-icon-button', 'ui-flat-button'];
const BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP = {
    'ui-icon-button': 'Button--type-icon',
    'ui-flat-button': 'Button--type-flat',
};

class ButtonBase {
    constructor(elementRef, focusMonitor) {
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
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
    get color() {
        return this._color;
    }
    set color(color) {
        this.updateColorClassName(color);
    }
    get hostElement() {
        return this.elementRef.nativeElement;
    }
    ngOnDestroy() {
        this.focusMonitor.ngOnDestroy();
    }
    focus(origin = 'program', options) {
        this.focusMonitor.focusVia(this.elementRef, origin, options);
    }
    updateColorClassName(color) {
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
    hasHostAttributes(...attributes) {
        return attributes.some((attribute) => this.hostElement.hasAttribute(attribute));
    }
}
__decorate([
    Input()
], ButtonBase.prototype, "color", null);

let ButtonComponent = class ButtonComponent extends ButtonBase {
    constructor(elementRef, focusMonitor) {
        super(elementRef, focusMonitor);
    }
};
ButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
ButtonComponent = __decorate([
    Component({
        selector: 'button[ui-button], button[ui-icon-button], button[ui-flat-button]',
        template: "<div class=\"Button__wrapper\">\n  <ng-content></ng-content>\n</div>\n",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".Button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center}.Button::-moz-focus-inner{border:0}"]
    })
], ButtonComponent);

let ButtonModule = class ButtonModule {
};
ButtonModule = __decorate([
    NgModule({
        imports: [CommonModule, A11yModule],
        declarations: [ButtonComponent],
        exports: [ButtonComponent],
    })
], ButtonModule);

// button

/**
 * Generated bundle index. Do not edit.
 */

export { BUTTON_HOST_ATTRIBUTES, BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP, ButtonComponent, ButtonModule, ButtonBase as ɵa };
//# sourceMappingURL=ui.js.map
