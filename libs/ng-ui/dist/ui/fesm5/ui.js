import { __values, __decorate, __extends } from 'tslib';
import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { Input, ElementRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var BUTTON_HOST_ATTRIBUTES = ['ui-icon-button', 'ui-flat-button'];
var BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP = {
    'ui-icon-button': 'Button--type-icon',
    'ui-flat-button': 'Button--type-flat',
};

var ButtonBase = /** @class */ (function () {
    function ButtonBase(elementRef, focusMonitor) {
        var e_1, _a;
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.hostElement.classList.add('Button');
        try {
            // For each of the variant selectors that is prevent in the button's host
            // attributes, add the correct corresponding class.
            for (var BUTTON_HOST_ATTRIBUTES_1 = __values(BUTTON_HOST_ATTRIBUTES), BUTTON_HOST_ATTRIBUTES_1_1 = BUTTON_HOST_ATTRIBUTES_1.next(); !BUTTON_HOST_ATTRIBUTES_1_1.done; BUTTON_HOST_ATTRIBUTES_1_1 = BUTTON_HOST_ATTRIBUTES_1.next()) {
                var attr = BUTTON_HOST_ATTRIBUTES_1_1.value;
                if (this.hasHostAttributes(attr)) {
                    this.hostElement.classList.add(BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP[attr]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (BUTTON_HOST_ATTRIBUTES_1_1 && !BUTTON_HOST_ATTRIBUTES_1_1.done && (_a = BUTTON_HOST_ATTRIBUTES_1.return)) _a.call(BUTTON_HOST_ATTRIBUTES_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.focusMonitor.monitor(this.elementRef, true);
    }
    Object.defineProperty(ButtonBase.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this.updateColorClassName(color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "hostElement", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    ButtonBase.prototype.ngOnDestroy = function () {
        this.focusMonitor.ngOnDestroy();
    };
    ButtonBase.prototype.focus = function (origin, options) {
        if (origin === void 0) { origin = 'program'; }
        this.focusMonitor.focusVia(this.elementRef, origin, options);
    };
    ButtonBase.prototype.updateColorClassName = function (color) {
        var hostEl = this.hostElement;
        if (this._color) {
            var previousColorClassName = "Button--color-" + this._color;
            // Remove previous button color class.
            if (hostEl.classList.contains(previousColorClassName)) {
                hostEl.classList.remove(previousColorClassName);
            }
        }
        if (color != null) {
            var nextClassName = "Button--color-" + color;
            hostEl.classList.add(nextClassName);
        }
        this._color = color;
    };
    ButtonBase.prototype.hasHostAttributes = function () {
        var _this = this;
        var attributes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            attributes[_i] = arguments[_i];
        }
        return attributes.some(function (attribute) { return _this.hostElement.hasAttribute(attribute); });
    };
    __decorate([
        Input()
    ], ButtonBase.prototype, "color", null);
    return ButtonBase;
}());

var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(elementRef, focusMonitor) {
        return _super.call(this, elementRef, focusMonitor) || this;
    }
    ButtonComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    ButtonComponent = __decorate([
        Component({
            selector: 'button[ui-button], button[ui-icon-button], button[ui-flat-button]',
            template: "<div class=\"Button__wrapper\">\n  <ng-content></ng-content>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".Button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center}.Button::-moz-focus-inner{border:0}"]
        })
    ], ButtonComponent);
    return ButtonComponent;
}(ButtonBase));

var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule = __decorate([
        NgModule({
            imports: [CommonModule, A11yModule],
            declarations: [ButtonComponent],
            exports: [ButtonComponent],
        })
    ], ButtonModule);
    return ButtonModule;
}());

// button

/**
 * Generated bundle index. Do not edit.
 */

export { BUTTON_HOST_ATTRIBUTES, BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP, ButtonComponent, ButtonModule, ButtonBase as ɵa };
//# sourceMappingURL=ui.js.map
