module.exports = {
    root: true,
    extends: '@react-native-community',
    rules: {
        'react-native/no-inline-styles': 'off',
        curly: 2,
    },
    ignorePatterns: ['*.spec.*', '**/e2e/**', '**/coverage/**'],
};
