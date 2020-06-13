import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ButtonBase } from './button-base';

@Component({
  selector: 'button[ui-button], button[ui-icon-button], button[ui-flat-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonBase<HTMLButtonElement> {
  constructor(elementRef: ElementRef<HTMLButtonElement>, focusMonitor: FocusMonitor) {
    super(elementRef, focusMonitor);
  }
}
