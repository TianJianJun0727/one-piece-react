import parser from '@typescript-eslint/parser';
import { Linter } from 'eslint';
import plugin from 'eslint-plugin-react';
import memoizeOne from 'memoize-one';

console.log('plugin', plugin);

// Create linter instance
const linter = new Linter();

// Define all rules from `eslint-plugin-react`
Object.keys(plugin.rules).forEach(key => {
  linter.defineRule(`react/${key}`, plugin.rules[key]);
});

// Define TS parser
linter.defineParser('@typescript-eslint/parser', parser);

const getConfig = memoizeOne(ruleSeverityOverrides => {
  const config = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      es6: true,
    },
    rules: plugin.configs.typescript.rules,
  };
  if (ruleSeverityOverrides) {
    // change severity levels of rules based on rules: Record<string, 0 | 1 | 2> arg
    Object.keys(ruleSeverityOverrides).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(config.rules, key)) {
        if (Array.isArray(config.rules[key])) {
          config.rules[key] = [
            ruleSeverityOverrides[key],
            ...config.rules[key].slice(1),
          ];
        } else {
          config.rules[key] = ruleSeverityOverrides[key];
        }
      }
    });
  }

  return config;
});

linter.verify = memoizeOne(linter.verify);
linter.verifyAndFix = memoizeOne(linter.verifyAndFix);

export { plugin };
export const eslintVersion = linter.version;

export function verify(code, ruleSeverityOverrides) {
  const config = getConfig(ruleSeverityOverrides);
  return linter.verify(code, config);
}

export function verifyAndFix(code, ruleSeverityOverrides) {
  const config = getConfig(ruleSeverityOverrides);
  return linter.verifyAndFix(code, config);
}
