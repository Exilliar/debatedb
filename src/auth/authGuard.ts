import { getInstance } from "./index";

export const authGuard = (to: any, from: any, next: any) => {
  const authService = getInstance();

  const fn = () => {
    // If the account is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next();
    }

    // Oterhwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch("loading", (loading) => {
    if (loading === false) {
      return fn();
    }
  });
};
