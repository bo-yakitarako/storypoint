import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { App } from './components/App';

type StorageKey = 'name' | 'user_id';
declare global {
  interface Storage {
    name: string;
    userId: string;
    getItem(key: StorageKey): string | null;
    setItem(key: StorageKey, value: string): void;
    removeItem(key: StorageKey): void;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
