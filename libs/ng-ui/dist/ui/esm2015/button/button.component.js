import { __decorate } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ButtonBase } from './button-base';
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
export { ButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpLyIsInNvdXJjZXMiOlsiYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUzNDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsVUFBNkI7SUFDaEUsWUFBWSxVQUF5QyxFQUFFLFlBQTBCO1FBQy9FLEtBQUssQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNGLENBQUE7O1lBSHlCLFVBQVU7WUFBbUMsWUFBWTs7QUFEdEUsZUFBZTtJQVAzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUVBQW1FO1FBQzdFLGtGQUFzQztRQUV0QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztHQUNXLGVBQWUsQ0FJM0I7U0FKWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbkJhc2UgfSBmcm9tICcuL2J1dHRvbi1iYXNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW3VpLWJ1dHRvbl0sIGJ1dHRvblt1aS1pY29uLWJ1dHRvbl0sIGJ1dHRvblt1aS1mbGF0LWJ1dHRvbl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgZXh0ZW5kcyBCdXR0b25CYXNlPEhUTUxCdXR0b25FbGVtZW50PiB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGZvY3VzTW9uaXRvcik7XG4gIH1cbn1cbiJdfQ==