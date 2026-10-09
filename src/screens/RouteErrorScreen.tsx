// RouteErrorScreen.tsx
// Redirects to the Home Screen with an alert message when a route error occurs.

// Import React Router components.
import { Navigate, useRouteError } from 'react-router-dom';

export const RouteErrorScreen = () =>
{
    // Get the error from the route.
    const error = useRouteError();

    // Log the error to the console for debugging purposes.
    console.error( 'Route error:', error );

    return (
        <Navigate
            to='/'
            replace
            state={ { routeError: true } }
        />
    );
};
