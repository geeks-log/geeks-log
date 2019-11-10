# Trouble shooting

## Cannot resolve eslint plugins when using IntelliJ IDEs.

Add patches to your 'eslint' package.

File (will probably) be located at `common/temp/node_modules/.regsitry.npmjs.org/eslint/{version}/node_modules/eslint/lib/shared/relative-module-resolve.js`.

```javascript
module.exports = {
  resolve(moduleName, relativeToPath) {
    const replacePath = '<YOUR_PROJECT_PATH>/tools/eslint/test/__placeholder__.js';

    try {
      return createRequire(
        relativeToPath.includes('__placeholder__') ? replacePath : relativeToPath,
      ).resolve(moduleName);
    } catch (error) {
      // ...
    }
  },
};
```
