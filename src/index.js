import React from 'react';
import { render } from 'react-dom';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import App from './App';
import '@shopify/polaris/dist/styles.css';

render(
  <AppProvider i18n={ enTranslations }>
    <App />
  </AppProvider>,
  document.getElementById('root')
);