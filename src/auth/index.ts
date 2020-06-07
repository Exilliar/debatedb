import Vue from "vue";
import Instance from "./Instance";

let instance: Instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export function useAuth0() {
  if (instance) return instance;

  instance = new Instance(); //, redirectUri, onRedirectCallback);

  return instance;
}

declare module "vue/types/vue" {
  interface Vue {
    $auth: Instance;
  }
}

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(vue: typeof Vue) {
    vue.prototype.$auth = useAuth0();
  },
};
