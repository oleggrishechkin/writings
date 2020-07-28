module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true
    },
    plugins: ['import', 'react', 'prettier'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: '16.8.0'
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        // eslint possible errors
        'no-prototype-builtins': 0,
        // eslint stylistic issues
        'lines-between-class-members': [2, 'always'],
        'no-lonely-if': 2,
        'no-multiple-empty-lines': 2,
        'no-unneeded-ternary': 2,
        'padding-line-between-statements': [
            2,
            {
                blankLine: 'always',
                prev: [
                    'break',
                    'cjs-export',
                    'class',
                    'const',
                    'continue',
                    'do',
                    'export',
                    'for',
                    'function',
                    'if',
                    'let',
                    'return',
                    'switch',
                    'throw',
                    'try',
                    'var',
                    'while'
                ],
                next: '*'
            },
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'break',
                    'cjs-export',
                    'class',
                    'const',
                    'continue',
                    'do',
                    'export',
                    'for',
                    'function',
                    'if',
                    'let',
                    'return',
                    'switch',
                    'throw',
                    'try',
                    'var',
                    'while'
                ]
            },
            { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            { blankLine: 'always', prev: ['cjs-import'], next: ['const', 'let', 'var'] },
            { blankLine: 'never', prev: ['cjs-import'], next: ['cjs-import'] }
        ],
        // eslint ecmascript 6
        'no-var': 2,
        'object-shorthand': 2,
        'prefer-const': 2,
        'prefer-template': 2,
        // react
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        // import static analysis
        'import/default': 2,
        'import/namespace': [2, { allowComputed: true }],
        'import/no-self-import': 2,
        'import/no-cycle': 2,
        'import/no-useless-path-segments': 2,
        // import helpful warnings
        'import/no-extraneous-dependencies': 1,
        // import style guide
        'import/first': 2,
        'import/no-duplicates': 2,
        'import/no-namespace': 2,
        'import/order': [2, { 'newlines-between': 'never', alphabetize: { order: 'asc', caseInsensitive: true } }],
        'import/newline-after-import': 2,
        'import/no-named-default': 2,
        'import/no-anonymous-default-export': 2
    }
};
