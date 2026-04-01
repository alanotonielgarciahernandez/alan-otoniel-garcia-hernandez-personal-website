// main.tsx
// The entry point of the app and where the router operates.

// Import React and ReactDOM.
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import React Router Provider.
import { RouterProvider } from 'react-router-dom';

// Import custom Router.
import { router } from './router/Router';

// Import custom CSS.
import './scss/styles.scss';

// Import localization.
import './i18n/i18n';

// Define the element where React displays the components.
ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    { /* Router component to render the appropiate UI. */ }
    <RouterProvider router={ router } />
  </React.StrictMode>
);
