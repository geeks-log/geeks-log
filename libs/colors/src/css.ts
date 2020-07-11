import kebabCase from 'lodash.kebabcase';
import {
  backgroundPalettes,
  ColorPalette,
  ColorPaletteHue,
  colorPalettes,
  commonColors,
  foregroundPalettes,
} from './palette';

export function formatCssVariableName(name: string) {
  const kebabCaseName = kebabCase(name);

  return `--gl-${kebabCaseName}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function keys<T extends { [key: string]: any }>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function createColorPaletteCssVariables(name: string, palette: ColorPalette) {
  const cssVariables: string[] = [];

  const hues = keys(palette).filter((x): x is ColorPaletteHue => x !== 'contrast');

  hues.forEach((hue) => {
    cssVariables.push(`${formatCssVariableName(name)}-${hue}: ${palette[hue]}`);
  });

  keys(palette.contrast).forEach((hue) => {
    cssVariables.push(`${formatCssVariableName(name)}-${hue}-contrast: ${palette.contrast[hue]}`);
  });

  return cssVariables;
}

export function createCss(theme: 'light' | 'dark' = 'light') {
  let css = ':root {\n';

  const background = backgroundPalettes[theme];
  const foreground = foregroundPalettes[theme];

  // 1. common
  Object.entries(commonColors).forEach(([name, value]) => {
    css += `  ${formatCssVariableName(`common-${name}`)}: ${value};\n`;
  });

  // 2. colors
  Object.entries(colorPalettes).forEach(([name, palette]) => {
    createColorPaletteCssVariables(name, palette).forEach((variable) => {
      css += `  ${variable};\n`;
    });
  });

  // 3. background, foreground
  Object.entries(background).forEach(([name, value]) => {
    css += `  ${formatCssVariableName(`background-${name}`)}: ${value};\n`;
  });
  Object.entries(foreground).forEach(([name, value]) => {
    css += `  ${formatCssVariableName(`foreground-${name}`)}: ${value};\n`;
  });

  css += '}';

  return css;
}
