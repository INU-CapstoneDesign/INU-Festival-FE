module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    // 코드 모양 규칙은 Prettier가 담당하므로 충돌하는 ESLint 규칙을 끕니다
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    curly: "error",
    "no-console": "warn",
    "no-alert": "warn",
    "react/no-array-index-key": "warn",
    "react/prop-types": "off",
    "max-len": ["warn", { code: 120 }],
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: [
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.test.ts",
        "**/*.test.tsx",
      ],
    }],
    "import/extensions": ["error", "ignorePackages", {
      js: "never",
      jsx: "never",
      ts: "never",
      tsx: "never",
    }],
    "react/jsx-filename-extension": [2, {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }],
    "react/require-default-props": [2, { functions: "defaultArguments" }],
    "jsx-a11y/label-has-associated-control": ["error", { assert: "either" }],
  },
};
