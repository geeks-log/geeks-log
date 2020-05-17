import { TAB } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { fakeAsync, flush } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { patchElementFocus } from '../testing';
import { ButtonColor } from './types';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

@Component({
  template: `
    <button id="button" ui-button>Button</button>
    <button id="primary-button" ui-button color="primary">
      Primary Button
    </button>
    <button ui-icon-button id="icon-button">Icon Button</button>
    <button ui-flat-button id="flat-button">Flat Button</button>
  `,
})
class TestButtonComponent {}

@Component({
  template: ` <button id="button" ui-button [color]="color">Button</button> `,
})
class TestButtonColorComponent {
  color: ButtonColor;
}

@Component({
  template: ` <button id="button" ui-button>Button</button> `,
})
class TestButtonFocusComponent {
  @ViewChild(ButtonComponent) button: ButtonComponent;
}

describe('button', () => {
  let spectator: Spectator<TestButtonComponent>;
  const createButton = createComponentFactory({
    component: TestButtonComponent,
    imports: [ButtonModule],
  });

  beforeEach(() => {
    spectator = createButton();
  });

  it("should ButtonComponent contains 'Button' class name.", () => {
    for (const elem of spectator.queryAll('button')) {
      expect(elem).toHaveClass('Button');
    }
  });

  it("icon button contains 'Button--type-icon' class name.", () => {
    expect(spectator.query('#icon-button')).toHaveClass('Button--type-icon');
  });

  it("flat button contains 'Button--type-flat' class name.", () => {
    expect(spectator.query('#flat-button')).toHaveClass('Button--type-flat');
  });

  it('can color primary button.', () => {
    expect(spectator.query('#primary-button')).toHaveClass('Button--color-primary');
  });
});

describe('button color', () => {
  let spectator: Spectator<TestButtonColorComponent>;
  const createButton = createComponentFactory({
    component: TestButtonColorComponent,
    imports: [ButtonModule],
  });

  beforeEach(() => {
    spectator = createButton();
  });

  it('default color is "none"', () => {
    expect(spectator.query('#button')).not.toHaveClass('Button--color-primary');
  });

  it('can change color', () => {
    spectator.component.color = 'primary';
    spectator.detectChanges();

    expect(spectator.query('#button')).toHaveClass('Button--color-primary');
  });
});

describe('button focusing', () => {
  let spectator: Spectator<TestButtonFocusComponent>;
  let buttonEl: HTMLButtonElement;
  const createButton = createComponentFactory({
    component: TestButtonFocusComponent,
    imports: [ButtonModule],
  });

  beforeEach(() => {
    spectator = createButton();
    buttonEl = spectator.query<HTMLButtonElement>('#button');
    patchElementFocus(buttonEl);
  });

  it('should be able to focus button with a specific focus origin', fakeAsync(() => {
    expect(buttonEl).not.toHaveClass('cdk-focused');

    spectator.component.button.focus('touch');
    spectator.fixture.detectChanges();
    flush();

    expect(buttonEl).toHaveClass('cdk-focused');
    expect(buttonEl).toHaveClass('cdk-touch-focused');
  }));

  it('should detect focus via keyboard', fakeAsync(() => {
    spectator.dispatchKeyboardEvent(document, 'keydown', TAB);
    buttonEl.focus();
    spectator.fixture.detectChanges();
    flush();

    expect(buttonEl).toHaveClass('cdk-focused');
    expect(buttonEl).toHaveClass('cdk-keyboard-focused');
  }));
});
