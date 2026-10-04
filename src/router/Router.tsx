// Router.tsx
// Assigns each Page Component to a route.

// Import React Router components.
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Import screens.
import { App } from '../App';;
import { HomeScreen, ContactScreen, CurriculumVitaeScreen, PostsScreen } from '../screens';

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
          // Posts Screen.
          path: 'posts',
          element: <PostsScreen />,

          loader: () =>
          {
            return {};
          }
        },
        {
          // Posts Screen.
          path: 'posts/:id',
          element: <PostsScreen />,

          loader: ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Catch-all route that redirects to the Home Screen for any undefined paths.
          path: '*',
          element: <Navigate to='/' replace />,
        },
      ],
    },
  ]
);
