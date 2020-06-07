// import Vue from "vue";
import { Vue, Component } from "vue-property-decorator";

import createAuth0Client, {
  GetTokenWithPopupOptions,
  GetTokenSilentlyOptions,
  GetIdTokenClaimsOptions,
  RedirectLoginOptions,
  LogoutOptions,
  PopupLoginOptions,
} from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

import User from "@/models/User";

import store from "@/store";

import UserDatadb from "@/db/classData/user";

@Component
export default class Instance extends Vue {
  options = {
    domain: "exilliar.eu.auth0.com",
    clientId: "xt5pVZzaTQKpoAuhheVY7v5W2LesWp4W",
    audience: undefined,
  };
  redirectUri = "http://localhost:8080";
  onRedirectCallback = (appState?: any) =>
    window.history.replaceState({}, document.title, window.location.pathname);
  loading = true;
  isAuthenticated = false;
  user = {} as User;
  auth0Client = {} as Auth0Client;
  popupOpen = false;
  error = null;

  /** Authenticates the user using a popup window */
  loginWithPopup = async (o?: PopupLoginOptions | undefined) => {
    this.popupOpen = true;

    try {
      await this.auth0Client.loginWithPopup(o);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    } finally {
      this.popupOpen = false;
    }

    // this.user = await this.auth0Client.getUser();
    await this.updateUser();
    this.isAuthenticated = true;
  };
  /** Handles the callback when logging in using a redirect */
  async handleRedirectCallback() {
    this.loading = true;
    try {
      await this.auth0Client.handleRedirectCallback();
      // this.user = await this.auth0Client.getUser();
      await this.updateUser();
      this.isAuthenticated = true;
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  }
  /** Authenticates the user using the redirect method */
  loginWithRedirect(o?: RedirectLoginOptions | undefined) {
    return this.auth0Client.loginWithRedirect(o);
  }
  /** Returns all the claims present in the ID token */
  getIdTokenClaims(o?: GetIdTokenClaimsOptions | undefined) {
    return this.auth0Client.getIdTokenClaims(o);
  }
  /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
  getTokenSilently(o?: GetTokenSilentlyOptions | undefined) {
    return this.auth0Client.getTokenSilently(o);
  }
  /** Gets the access token using a popup window */

  getTokenWithPopup(o: GetTokenWithPopupOptions | undefined) {
    return this.auth0Client.getTokenWithPopup(o);
  }
  /** Logs the user out and removes their session on the authorization server */
  logout(o?: LogoutOptions | undefined) {
    return this.auth0Client.logout(o);
  }
  /** Use this lifecycle method to instantiate the SDK client */
  async created() {
    // Create a new instance of the SDK client using members of the given options object
    this.auth0Client = await createAuth0Client({
      domain: this.options.domain,
      client_id: this.options.clientId,
      audience: this.options.audience,
      redirect_uri: this.redirectUri,
    });

    try {
      // If the user is returning to the app after authentication..
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        // handle the redirect and retrieve tokens
        const { appState } = await this.auth0Client.handleRedirectCallback();

        // Notify subscribers that the redirect callback has happened, passing the appState
        // (useful for retrieving any pre-authentication state)
        this.onRedirectCallback(appState);
      }
    } catch (e) {
      this.error = e;
    } finally {
      // Initialize our internal authentication state
      this.isAuthenticated = await this.auth0Client.isAuthenticated();
      await this.updateUser();
      // this.user = await this.auth0Client.getUser();
      // this.$store.dispatch("updateUser", this.user);
      this.loading = false;
    }
  }

  async updateUser() {
    this.user = await this.auth0Client.getUser();
    console.log("user:", this.user);
    if (this.user) {
      const storeUser = await new UserDatadb().getSingle(this.user);
      store.dispatch("updateUser", storeUser);
    }
  }
}
