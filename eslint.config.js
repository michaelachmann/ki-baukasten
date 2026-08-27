import js from '@eslint/js';

export default [
  {
    ignores: ['dist/**', 'public/vendor/**', 'support.js'],
  },
  {
    files: ['src/**/*.js', '*.config.js'],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        Blob: 'readonly',
        clearTimeout: 'readonly',
        document: 'readonly',
        FormData: 'readonly',
        Intl: 'readonly',
        navigator: 'readonly',
        PptxGenJS: 'readonly',
        requestAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        structuredClone: 'readonly',
      },
    },
  },
];
