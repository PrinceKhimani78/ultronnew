import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  /**
   * The rules PROJECT.md states in prose. A standard that only exists in a
   * document is a standard that erodes; these fail the build instead.
   */
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // "No `console.log` in committed code. Structured logging at API
      // boundaries only" — warn/error stay available for exactly that.
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // "No `any`. No `@ts-ignore`."
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': true, 'ts-expect-error': 'allow-with-description' },
      ],

      // Unused code is dead code. `_`-prefixed args stay legal for signatures
      // that must match an interface.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  /**
   * Tier boundaries from the Component Guidelines. `ui/` primitives hold zero
   * business knowledge, so they cannot reach upward into compositions — the
   * import is the thing that would make them stop being primitives.
   */
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/sections/*', '@/content/*'],
              message:
                'ui/ primitives must stay free of business meaning. Pass content in as props.',
            },
          ],
        },
      ],
    },
  },

  /**
   * `content/` is the CMS seam: typed data only. The moment it imports React it
   * stops being swappable for an async fetch, which is the entire point of it.
   */
  {
    files: ['src/content/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react-dom', '@/components/*'],
              message:
                'content/ holds no JSX and no components — typed objects only.',
            },
          ],
        },
      ],
    },
  },

  /**
   * `lib/env.ts` is the single reader of `process.env`; everything else imports
   * the validated `env` object so the shape is checked in one place.
   */
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/lib/env.ts'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message:
            "Import { env } from '@/lib/env' instead of reading process.env.",
        },
      ],
    },
  },
]);

export default eslintConfig;
