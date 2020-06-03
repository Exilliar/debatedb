import Vue from "vue";
import createAuth0Client, {
  GetTokenWithPopupOptions,
  GetTokenSilentlyOptions,
  GetIdTokenClaimsOptions,
  RedirectLoginOptions,
  LogoutOptions,
  PopupLoginOptions,
} from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

export default class Instance extends Vue {
  options: any;
  redirectUri: any;
  onRedirectCallback: any;
  loading = true;
  isAuthenticated = false;
  user = {};
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

    this.user = await this.auth0Client.getUser();
    this.isAuthenticated = true;
  };
  /** Handles the callback when logging in using a redirect */
  handleRedirectCallback = async () => {
    console.log("redirect");
    this.loading = true;
    try {
      await this.auth0Client.handleRedirectCallback();
      this.user = await this.auth0Client.getUser();
      this.isAuthenticated = true;
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  };
  /** Authenticates the user using the redirect method */
  loginWithRedirect = (o?: RedirectLoginOptions | undefined) => {
    return this.auth0Client.loginWithRedirect(o);
  };
  /** Returns all the claims present in the ID token */
  getIdTokenClaims = (o?: GetIdTokenClaimsOptions | undefined) => {
    return this.auth0Client.getIdTokenClaims(o);
  };
  /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
  getTokenSilently = (o?: GetTokenSilentlyOptions | undefined) => {
    return this.auth0Client.getTokenSilently(o);
  };
  /** Gets the access token using a popup window */

  getTokenWithPopup = (o: GetTokenWithPopupOptions | undefined) => {
    return this.auth0Client.getTokenWithPopup(o);
  };
  /** Logs the user out and removes their session on the authorization server */
  logout = (o?: LogoutOptions | undefined) => {
    return this.auth0Client.logout(o);
  };
  /** Use this lifecycle method to instantiate the SDK client */
  async created() {
    console.log("created");
    // Create a new instance of the SDK client using members of the given options object
    this.auth0Client = await createAuth0Client({
      domain: this.options.domain,
      client_id: this.options.clientId,
      audience: this.options.audience,
      redirect_uri: this.redirectUri,
    });
    console.log("created client");

    try {
      // If the user is returning to the app after authentication..
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        console.log("redirect");
        // handle the redirect and retrieve tokens
        const { appState } = await this.auth0Client.handleRedirectCallback();

        // Notify subscribers that the redirect callback has happened, passing the appState
        // (useful for retrieving any pre-authentication state)
        this.onRedirectCallback(appState);
        console.log("end redirect");
      }
    } catch (e) {
      this.error = e;
    } finally {
      console.log("finally");
      // Initialize our internal authentication state
      this.isAuthenticated = await this.auth0Client.isAuthenticated();
      console.log("is authenticated", this.isAuthenticated);
      this.user = await this.auth0Client.getUser();
      console.log("got user", this.user);
      this.loading = false;
      console.log("loading false", this.loading);
    }
  }
  constructor(options: any, redirectUri: any, onRedirectCallback: any) {
    super();
    this.options = options;
    this.redirectUri = redirectUri;
    this.onRedirectCallback = onRedirectCallback;

    this.created();
  }
}
