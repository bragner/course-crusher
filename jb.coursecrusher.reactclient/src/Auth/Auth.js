import auth0 from "auth0-js";
import Config from "../Config";

const REDIRECT_ON_LOGIN = "redirect_on_login";

let _accessToken = null;
let _expiresAt = null;

let domain = Config.AUTH_0_DOMAIN;
let client_id = Config.AUTH_0_CLIENT_ID;
let callback_url = `${Config.CLIENT_ENDPOINT}/callback`;
let audience = Config.API_ENDPOINT;

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: domain,
      clientID: client_id,
      redirectUri: callback_url,
      audience: audience,
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  isAuthenticated() {
    return new Date().getTime() < _expiresAt;
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );

    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectLocation =
          localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
            ? "/"
            : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
        this.getProfile((profile, err) => {
          localStorage.setItem("profile-img", profile.picture);

          this.history.push(redirectLocation);
        });
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}.`);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  logout = () => {
    this.auth0.logout({
      clientID: client_id,
      returnTo: Config.CLIENT_ENDPOINT
    });
  };

  getAccessToken = () => {
    if (!_accessToken) {
      throw new Error("No access token found.");
    }

    return _accessToken;
  };
  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      this.userProfile = profile;
      cb(profile, err);
    });
  };
  setSession = authResult => {
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    _accessToken = authResult.accessToken;

    this.scheduleTokenRenewal();
  };
  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}`);
      } else {
        this.setSession(result);
      }
      if (cb) cb(err, result);
    });
  }

  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }
}
