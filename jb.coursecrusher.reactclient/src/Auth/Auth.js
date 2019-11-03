import auth0 from "auth0-js";

const REDIRECT_ON_LOGIN = "redirect_on_login";

let _accessToken = null;
let _expiresAt = null;

let domain = "course-crusher.eu.auth0.com";
let client_id = "";
let callback_url = "http://localhost:3000/callback";
let audience = "https://localhost:44320";

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
    const ea = localStorage.getItem("expiresAt");
    return new Date().getTime() < ea;
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
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details`);
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  logout = () => {
    this.auth0.logout({
      clientID: client_id,
      returnTo: "http://localhost:3000"
    });
    localStorage.removeItem("profile-img");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
  };

  getAccessToken = () => {
    const at = localStorage.getItem("accessToken");
    if (!at) {
      throw new Error("No access token found.");
    }

    return at;
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
    localStorage.setItem("accessToken", _accessToken);
    localStorage.setItem("expiresAt", _expiresAt);
    this.getProfile((profile, error) => {
      localStorage.setItem("profile-img", profile.picture);
    });
  };
}
