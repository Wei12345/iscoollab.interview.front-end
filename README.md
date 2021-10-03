## 平台支援

- 支援現代瀏覽器

- [簡易的啟動 Electron](#Electron)

## 相關技術

- [React](https://zh-hant.reactjs.org/)
- [Redux](https://redux.js.org/)
- [Webpack 5](https://webpack.js.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [Electron](https://www.electronjs.org/)

## 環境需求

使用了 Webpack5，需要至少 Node.js 10.13.0 (LTS)

[Webpack 5 runs on Node.js version 10.13.0+.](https://webpack.js.org/concepts/#environment)

## 建置

```
npm ci
npm run build
```

## 開發

```
npm ci
npm run start
```

## 測試

```
npm ci
npm run test
```

## Electron

提供了簡易的啟動 electron

```
npm run build
npm run electron
```

## Babel Config

使用：

- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) 

## ESLint Config

使用：

- [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)
