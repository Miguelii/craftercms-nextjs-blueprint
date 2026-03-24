import { defineConfig } from 'vite-plus'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    lint: {
        plugins: ['typescript', 'react', 'react-perf', 'nextjs', 'import', 'unicorn'],
        categories: {
            correctness: 'error',
            suspicious: 'warn',
            pedantic: 'warn',
            perf: 'warn',
            style: 'off',
        },
        rules: {
            'typescript/no-unused-vars': 'warn',
            'unicorn/prefer-node-protocol': 'error',
            'unicorn/prefer-dom-node-remove': 'warn',
            'import/no-duplicates': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react-perf/jsx-no-new-object-as-prop': 'off',
            'react-perf/jsx-no-new-array-as-prop': 'off',
            'react-perf/jsx-no-new-function-as-prop': 'off',
            'react/react-in-jsx-scope': 'off',
            'import/no-unassigned-import': 'off',
            'eslint/no-inline-comments': 'off',
            'import/no-named-as-default': 'off',
            'react-perf/jsx-no-jsx-as-prop': 'off',
            'import/max-dependencies': ['warn', { max: 15 }],
            'eslint/max-lines-per-function': ['warn', { max: 60 }],
            'eslint/no-negated-condition': 'off',
        },
        ignorePatterns: ['.next', 'out', 'build', 'node_modules'],
    },
    fmt: {
        semi: false,
        singleQuote: true,
        tabWidth: 4,
        printWidth: 100,
        trailingComma: 'es5',
        ignorePatterns: ['build', 'coverage'],
    },
})
