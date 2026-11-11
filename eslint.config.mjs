import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import boundaries from 'eslint-plugin-boundaries';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app-customer', pattern: 'apps/customer-pwa/**' },
        { type: 'app-merchant', pattern: 'apps/merchant-portal/**' },
        { type: 'lib-ui', pattern: 'libs/ui/**' },
        { type: 'lib-api-client', pattern: 'libs/api-client/**' },
        { type: 'lib-auth-client', pattern: 'libs/auth-client/**' },
        { type: 'lib-domain-models', pattern: 'libs/domain-models/**' },
        { type: 'lib-utilities', pattern: 'libs/utilities/**' },
        { type: 'lib-i18n', pattern: 'libs/i18n/**' },
        { type: 'lib-testing', pattern: 'libs/testing/**' },
      ],
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: ['app', 'merchant', 'ui'], style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: ['app', 'merchant', 'ui'], style: 'kebab-case' },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              target: ['lib-*'],
              allow: 'index.ts',
            },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['apps/customer-pwa/**', 'apps/merchant-portal/**'],
              message: 'Direct imports across applications are strictly forbidden. Use shared libs instead.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
