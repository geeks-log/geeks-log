import { Global } from '@emotion/core';
import css from '@emotion/css';
import { ThemeProvider, withTheme } from 'emotion-theming';
import React, { ReactNode } from 'react';
import { Provider as ReakitProvider } from 'reakit';
import { Theme } from '../theming';

const makeGlobalStyles = (theme: Theme) => css`
  body {
    background-color: ${theme.background.background};
    color: ${theme.foreground.text};
  }
`;

const GlobalStyles = withTheme(({ theme }) => <Global styles={makeGlobalStyles(theme)} />);

interface Props {
  theme: Theme;
  children: ReactNode;
}

export function UIProvider({ theme, children }: Props) {
  return (
    <ReakitProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ReakitProvider>
  );
}
