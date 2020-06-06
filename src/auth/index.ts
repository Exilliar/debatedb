import Vue from "vue";
import Instance from "./Instance";

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = (appState?: any) =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance: Instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export function useAuth0({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) {
  if (instance) return instance;

  instance = new Instance(options); //, redirectUri, onRedirectCallback);

  return instance;
}

declare module "vue/types/vue" {
  interface Vue {
    $auth: Instance;
  }
}

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(vue: typeof Vue, options: any) {
    vue.prototype.$auth = useAuth0(options);
  },
};
