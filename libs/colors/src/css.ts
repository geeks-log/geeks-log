import kebabCase from 'lodash.kebabcase';
import {
  BackgroundPalette,
  backgroundPalettes,
  ColorPalette,
  colorPalettes,
  commonColors,
  ForegroundPalette,
  foregroundPalettes,
  lightBackgroundPalette,
  lightForegroundPalette,
} from './palette';

export function formatCssVariableName(name: string) {
  const kebabCaseName = kebabCase(name);

  return `--gl-${kebabCaseName}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function keys<T extends { [key: string]: any }>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function colorToCss<T extends { [key: string]: any }>(color: T, prefix?: string) {
  return keys(color).reduce((css, key) => {
    css[key] = formatCssVariableName(prefix != null ? `${prefix}-${key}` : (key as string));

    return css;
  }, {} as Record<keyof T, string>);
}

function colorPaletteToCss(name: string, colorPalette: ColorPalette) {
  const { contrast, ...other } = colorPalette;

  return {
    ...colorToCss(other, name),
    contrast: colorToCss(contrast, `${name}-contrast`),
  };
}

type CommonColorsCss = Record<keyof typeof commonColors, string>;
type ColorPalettesCss = Record<keyof typeof colorPalettes, ColorPalette>;

type Css = Readonly<CommonColorsCss> &
  Readonly<ColorPalettesCss> & {
    background: BackgroundPalette;
    foreground: ForegroundPalette;
  };

export const css: Css = {
  ...colorToCss(commonColors),
  grey: colorPaletteToCss('grey', colorPalettes.grey),
  red: colorPaletteToCss('red', colorPalettes.red),
  pink: colorPaletteToCss('pink', colorPalettes.pink),
  purple: colorPaletteToCss('purple', colorPalettes.purple),
  blue: colorPaletteToCss('blue', colorPalettes.blue),
  background: colorToCss(lightBackgroundPalette, 'background'),
  foreground: colorToCss(lightForegroundPalette, 'foreground'),
};

export function createCss(theme?: 'light' | 'dark') {
  let text = ':root {\n';

  const background = backgroundPalettes[theme ?? 'light'];
  const foreground = foregroundPalettes[theme ?? 'light'];

  // 1. common
  keys(commonColors).forEach((key) => {
    const name = css[key];
    const value = commonColors[key];

    text += `  ${name}: ${value};\n`;
  });

  // 2. colors
  keys(colorPalettes).forEach((key) => {
    const palette = css[key];
    const { contrast, ...other } = palette;

    keys(other).forEach((hue) => {
      const name = palette[hue];
      const value = colorPalettes[key][hue];

      text += `  ${name}: ${value};\n`;
    });

    keys(contrast).forEach((hue) => {
      const name = palette.contrast[hue];
      const value = colorPalettes[key].contrast[hue];

      text += `  ${name}: ${value};\n`;
    });
  });

  // 3. background, foreground
  keys(background).forEach((key) => {
    const name = css.background[key];
    const value = background[key];

    text += `  ${name}: ${value};\n`;
  });
  keys(foreground).forEach((key) => {
    const name = css.foreground[key];
    const value = foreground[key];

    text += `  ${name}: ${value};\n`;
  });

  text += '}';

  // Add color preference media query if theme is not specified.
  if (theme == null) {
    text += '\n\n';
    text += `@media (prefers-color-scheme: dark) {\n`;
    text += `  :root {\n`;

    keys(backgroundPalettes.dark).forEach((key) => {
      const name = css.background[key];
      const value = backgroundPalettes.dark[key];

      text += `    ${name}: ${value};\n`;
    });
    keys(foregroundPalettes.dark).forEach((key) => {
      const name = css.foreground[key];
      const value = foregroundPalettes.dark[key];

      text += `    ${name}: ${value};\n`;
    });

    text += `  }\n`;
    text += `}`;
  }

  return text;
}
