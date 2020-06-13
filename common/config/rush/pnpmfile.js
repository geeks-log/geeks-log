'use strict';

/**
 * When using the PNPM package manager, you can use pnpmfile.js to workaround
 * dependencies that have mistakes in their package.json file.  (This feature is
 * functionally similar to Yarn's "resolutions".)
 *
 * For details, see the PNPM documentation:
 * https://pnpm.js.org/docs/en/hooks.html
 *
 * IMPORTANT: SINCE THIS FILE CONTAINS EXECUTABLE CODE, MODIFYING IT IS LIKELY TO INVALIDATE
 * ANY CACHED DEPENDENCY ANALYSIS.  After any modification to pnpmfile.js, it's recommended to run
 * "rush update --full" so that PNPM will recalculate all version selections.
 */
module.exports = {
  hooks: {
    readPackage,
  },
};

const patches = [
  {
    needed: {
      name: 'webpack',
      version: '^4.0.0',
    },
    for: ['babel-loader', 'webpack-dev-server', 'html-webpack-plugin'],
  },
  {
    needed: {
      name: '@angular/core',
      version: '~9.1.7',
    },
    for: ['@angular/animations', '@angular/cdk', '@angular/forms', '@angular/material', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/router', 'codelyzer', '@angular/common', '@ngneat/spectator', '@angular/flex-layout'],
  },
  {
    needed: {
      name: '@angular/common',
      version: '~9.1.7',
    },
    for: ['@angular/animations', '@angular/cdk', '@angular/forms', '@angular/material', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/router', '@ngneat/spectator', '@angular/flex-layout'],
  },
  {
    needed: {
      name: '@angular/cdk',
      version: '~9.2.3',
    },
    for: ['@angular/material']
  }
];

function readPackage(packageJson) {
  for (const patch of patches) {
    if (patch.for.includes(packageJson.name)) {
      packageJson.dependencies[patch.needed.name] = patch.needed.version;
    }
  }

  return packageJson;
}
