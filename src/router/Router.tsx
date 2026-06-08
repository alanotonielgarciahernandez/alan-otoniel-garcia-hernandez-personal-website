// Router.tsx
// Assigns each Page Component to a route.

// Import React Router components.
import { createBrowserRouter } from 'react-router-dom';

// Import screens.
import { App } from '../App';;
import { HomeScreen, ContactScreen, CurriculumVitaeScreen } from '../screens';

// App router that manages the history stack.
export const router = createBrowserRouter
(
  [
    {
      // Base component extended by all the pages with the project context.
      path: '',
      element: <App />,
      errorElement: <App />,

      // The children are placed inside the <App /> component.
      children:
      [
        {
          // Home Screen displayed at index.
          path: '/',
          element: <HomeScreen />,
        },
        {
          // Curriculum Vitae Screen.
          path: 'cv',
          element: <CurriculumVitaeScreen />,
        },
        {
          // Contact Screen.
          path: 'contact',
          element: <ContactScreen />,
        },
        {
          // Catch-all route that redirects to the Home Screen for any undefined paths.
          path: '*',
          element: <HomeScreen />,
        },
      ],
    },
  ]
);
