import CleanCSS from 'clean-css';
import fs from 'fs-extra';
import path from 'path';
import { createCss } from '../src';

const ROOT_PATH = path.resolve(__dirname, '../');

async function prebuilt() {
  const minifier = new CleanCSS({ returnPromise: true });

  const lightThemeCss = createCss('light');
  const { styles: lightThemeCssMinified } = await minifier.minify(lightThemeCss);
  const darkThemeCss = createCss('dark');
  const { styles: darkThemeCssMinified } = await minifier.minify(darkThemeCss);
  const adaptiveCss = createCss();
  const { styles: adaptiveCssMinified } = await minifier.minify(adaptiveCss);

  const lightThemeFilepath = path.join(ROOT_PATH, 'light-theme.css');
  const lightThemeMinifiedFilepath = path.join(ROOT_PATH, 'light-theme.min.css');

  const darkThemeFilepath = path.join(ROOT_PATH, 'dark-theme.css');
  const darkThemeMinifiedFilepath = path.join(ROOT_PATH, 'dark-theme.min.css');

  const adaptiveFilepath = path.join(ROOT_PATH, 'adaptive.css');
  const adaptiveMinifiedFilepath = path.join(ROOT_PATH, 'adaptive.min.css');

  await Promise.all([
    fs.remove(lightThemeFilepath),
    fs.remove(lightThemeMinifiedFilepath),
    fs.remove(darkThemeFilepath),
    fs.remove(darkThemeMinifiedFilepath),
    fs.remove(adaptiveFilepath),
    fs.remove(adaptiveMinifiedFilepath),
  ]);

  await Promise.all([
    fs.outputFile(lightThemeFilepath, lightThemeCss),
    fs.outputFile(lightThemeMinifiedFilepath, lightThemeCssMinified),
    fs.outputFile(darkThemeFilepath, darkThemeCss),
    fs.outputFile(darkThemeMinifiedFilepath, darkThemeCssMinified),
    fs.outputFile(adaptiveFilepath, adaptiveCss),
    fs.outputFile(adaptiveMinifiedFilepath, adaptiveCssMinified),
  ]);
}

prebuilt().catch((error) => {
  console.error(error);
  process.exit(1);
});
