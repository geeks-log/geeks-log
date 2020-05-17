import { __decorate, __values } from "tslib";
import { Input } from '@angular/core';
import { BUTTON_HOST_ATTRIBUTE_CLASS_NAME_MAP, BUTTON_HOST_ATTRIBUTES } from './types';
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
export { ButtonBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS8iLCJzb3VyY2VzIjpbImJ1dHRvbi9idXR0b24tYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFjLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsc0JBQXNCLEVBQWUsTUFBTSxTQUFTLENBQUM7QUFFcEc7SUFDRSxvQkFBZ0MsVUFBeUIsRUFBWSxZQUEwQjs7UUFBL0QsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUFZLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzdGLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFFekMseUVBQXlFO1lBQ3pFLG1EQUFtRDtZQUNuRCxLQUFtQixJQUFBLDJCQUFBLFNBQUEsc0JBQXNCLENBQUEsOERBQUEsa0dBQUU7Z0JBQXRDLElBQU0sSUFBSSxtQ0FBQTtnQkFDYixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzVFO2FBQ0Y7Ozs7Ozs7OztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUtELHNCQUFJLDZCQUFLO2FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQUVELFVBQVUsS0FBa0I7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7OztPQUpBO0lBTUQsc0JBQUksbUNBQVc7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxnQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMEJBQUssR0FBTCxVQUFNLE1BQStCLEVBQUUsT0FBc0I7UUFBdkQsdUJBQUEsRUFBQSxrQkFBK0I7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLHlDQUFvQixHQUE5QixVQUErQixLQUFrQjtRQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQU0sc0JBQXNCLEdBQUcsbUJBQWlCLElBQUksQ0FBQyxNQUFRLENBQUM7WUFFOUQsc0NBQXNDO1lBQ3RDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUNqRDtTQUNGO1FBRUQsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLElBQU0sYUFBYSxHQUFHLG1CQUFpQixLQUFPLENBQUM7WUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU8sc0NBQWlCLEdBQXpCO1FBQUEsaUJBRUM7UUFGeUIsb0JBQXVCO2FBQXZCLFVBQXVCLEVBQXZCLHFCQUF1QixFQUF2QixJQUF1QjtZQUF2QiwrQkFBdUI7O1FBQy9DLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQTFDRDtRQURDLEtBQUssRUFBRTsyQ0FHUDtJQXlDSCxpQkFBQztDQUFBLEFBN0RELElBNkRDO1NBN0RxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJVVFRPTl9IT1NUX0FUVFJJQlVURV9DTEFTU19OQU1FX01BUCwgQlVUVE9OX0hPU1RfQVRUUklCVVRFUywgQnV0dG9uQ29sb3IgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJ1dHRvbkJhc2U8VCBleHRlbmRzIEhUTUxFbGVtZW50PiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxUPiwgcHJvdGVjdGVkIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgdGhpcy5ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdCdXR0b24nKTtcblxuICAgIC8vIEZvciBlYWNoIG9mIHRoZSB2YXJpYW50IHNlbGVjdG9ycyB0aGF0IGlzIHByZXZlbnQgaW4gdGhlIGJ1dHRvbidzIGhvc3RcbiAgICAvLyBhdHRyaWJ1dGVzLCBhZGQgdGhlIGNvcnJlY3QgY29ycmVzcG9uZGluZyBjbGFzcy5cbiAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQlVUVE9OX0hPU1RfQVRUUklCVVRFUykge1xuICAgICAgaWYgKHRoaXMuaGFzSG9zdEF0dHJpYnV0ZXMoYXR0cikpIHtcbiAgICAgICAgdGhpcy5ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKEJVVFRPTl9IT1NUX0FUVFJJQlVURV9DTEFTU19OQU1FX01BUFthdHRyXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYsIHRydWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb2xvcjogQnV0dG9uQ29sb3I7XG5cbiAgQElucHV0KClcbiAgZ2V0IGNvbG9yKCk6IEJ1dHRvbkNvbG9yIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cblxuICBzZXQgY29sb3IoY29sb3I6IEJ1dHRvbkNvbG9yKSB7XG4gICAgdGhpcy51cGRhdGVDb2xvckNsYXNzTmFtZShjb2xvcik7XG4gIH1cblxuICBnZXQgaG9zdEVsZW1lbnQoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5mb2N1c01vbml0b3IubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIGZvY3VzKG9yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScsIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmVsZW1lbnRSZWYsIG9yaWdpbiwgb3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlQ29sb3JDbGFzc05hbWUoY29sb3I6IEJ1dHRvbkNvbG9yKTogdm9pZCB7XG4gICAgY29uc3QgaG9zdEVsID0gdGhpcy5ob3N0RWxlbWVudDtcblxuICAgIGlmICh0aGlzLl9jb2xvcikge1xuICAgICAgY29uc3QgcHJldmlvdXNDb2xvckNsYXNzTmFtZSA9IGBCdXR0b24tLWNvbG9yLSR7dGhpcy5fY29sb3J9YDtcblxuICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIGJ1dHRvbiBjb2xvciBjbGFzcy5cbiAgICAgIGlmIChob3N0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKHByZXZpb3VzQ29sb3JDbGFzc05hbWUpKSB7XG4gICAgICAgIGhvc3RFbC5jbGFzc0xpc3QucmVtb3ZlKHByZXZpb3VzQ29sb3JDbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2xvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBuZXh0Q2xhc3NOYW1lID0gYEJ1dHRvbi0tY29sb3ItJHtjb2xvcn1gO1xuICAgICAgaG9zdEVsLmNsYXNzTGlzdC5hZGQobmV4dENsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgfVxuXG4gIHByaXZhdGUgaGFzSG9zdEF0dHJpYnV0ZXMoLi4uYXR0cmlidXRlczogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXR0cmlidXRlcy5zb21lKChhdHRyaWJ1dGUpID0+IHRoaXMuaG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpO1xuICB9XG59XG4iXX0=