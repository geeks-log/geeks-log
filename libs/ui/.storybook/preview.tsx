import { boolean, withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';
import React from 'react';
import { defaultLightTheme, UIProvider } from '../src';

addDecorator(withKnobs);
addDecorator((storyFn) => {
  const darkTheme = boolean('Dark Theme');
});
