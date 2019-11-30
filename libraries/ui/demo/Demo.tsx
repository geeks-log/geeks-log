import React from 'react';
import { Button, defaultLightTheme, GeeksLogUIProvider, Spinner } from '../src';

export default function Demo() {
  return (
    <GeeksLogUIProvider theme={defaultLightTheme}>
      <main>
        <h1>Hello World!</h1>
        <Button>Button</Button>
        <Spinner />
      </main>
    </GeeksLogUIProvider>
  );
}
