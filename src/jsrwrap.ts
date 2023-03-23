import { encode as base64Encode } from "https://deno.land/std@0.166.0/encoding/base64.ts";
import { Subreddit } from "./subreddit.ts";
import { Submission } from "./submission.ts";

type Scope =
  | "identity"
  | "edit"
  | "flair"
  | "history"
  | "modconfig"
  | "modflair"
  | "modlog"
  | "modposts"
  | "modwiki"
  | "mysubreddits"
  | "privatemessages"
  | "read"
  | "report"
  | "save"
  | "submit"
  | "subscribe"
  | "vote"
  | "wikiedit"
  | "wikiread"
  | "*";

type accessTokenJsonResponse = {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
  refresh_token?: string;
};

export class OAuthError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
    this.name = "OAuthError";
  }
}

export class Jsrwrap {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  userAgent: string;
  refreshToken?: string;

  constructor(
    accessToken: string,
    clientId: string,
    clientSecret: string,
    userAgent: string,
    refreshToken?: string
  ) {
    this.accessToken = accessToken;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.userAgent = userAgent;
    this.refreshToken = refreshToken;
  }

  async refreshAccessToken() {
    if (this.refreshToken) {
      const body = `grant_type=refresh_token&refresh_token=${this.refreshToken}`;
      const res = await Jsrwrap.retrieveAccessToken({
        httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(
          this.clientId,
          this.clientSecret
        ),
        body,
        userAgent: this.userAgent,
      });

      if (res.status !== 200) {
        await res.body?.cancel();
        throw new Error("Invalid refresh_token");
      }

      this.accessToken = (
        (await res.json()) as accessTokenJsonResponse
      ).access_token;
    } else {
      throw new Error("No refresh_token; cannot refresh access token");
    }
  }

  /**
   * Encodes clientId and clientSecret for use in HTTP Basic Auth
   *
   * @param options.clientId - The client ID generated by Reddit during app registration.
   * @param options.clientSecret - The secret generated by Reddit during app registration.
   * @returns the Base64 encoding of `clientId:clientSecret`
   */
  static encodeClientIdAndSecret(clientId: string, clientSecret: string) {
    return base64Encode(`${clientId}:${clientSecret}`);
  }

  /**
   * Sends a request to Reddit to retrieve an access token
   *
   * @param options.httpBasicAuth - The Base64 encoding of clientId:clientSecret
   * @param options.body - The POST data. The POST data needed varies depending on the type of authentication
   * @param options.userAgent - The client's User-Agent. Should be unique and descriptive string. Include target platform, unique application identifier, a version string,
   * and your username as contact information. E.g. `<platform>:<app ID>:<version string> (by /u/<reddit username>)`
   *
   * @returns the response given by Reddit to `https://www.reddit.com/api/v1/access_token`
   */
  private static async retrieveAccessToken(options: {
    httpBasicAuth: string;
    body: string;
    userAgent: string;
  }) {
    const res = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${options.httpBasicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": options.userAgent,
      },
      body: options.body,
    });

    return res;
  }

  /**
   * Creates a Jsrwrap object with an access token after authenticating with Reddit through username and password
   * Can only be used for script type apps
   *
   * @param options.clientId - The Client ID generated by Reddit during app registration.
   * @param options.clientSecret - The secret generated by Reddit during app registration.
   * @param options.userAgent - The client's User-Agent. Should be unique and descriptive string. Include target platform, unique application identifier, a version string,
   * and your username as contact information. E.g. `<platform>:<app ID>:<version string> (by /u/<reddit username>)`
   * @param options.username - Your Reddit account username
   * @param options.password - Your Reddit account password
   *
   * @returns a Jsrwrap object with a valid access token
   *
   * @throws {@link OAuthError}
   * Thrown if an error occurs during the authentication process
   */
  static async fromUsernamePassword(options: {
    clientId: string;
    clientSecret: string;
    userAgent: string;
    username: string;
    password: string;
  }) {
    const { clientId, clientSecret, userAgent, username, password } = options;
    const body = `grant_type=password&username=${username}&password=${password}`;
    const res = await this.retrieveAccessToken({
      httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(clientId, clientSecret),
      body,
      userAgent,
    });

    if (res.status !== 200) {
      await res.body?.cancel();
      throw new OAuthError("Invalid clientId or clientSecret");
    }

    const resJson = (await res.json()) as {
      error: boolean;
      error_description: string;
      access_token: string;
    };
    if (resJson.error) {
      if (
        resJson.error_description === "Only script apps may use password auth"
      ) {
        throw new OAuthError(resJson.error_description);
      }

      throw new OAuthError(
        "Username or password does not match the account used to register the app with the given clientId and clientSecret"
      );
    }

    return new Jsrwrap(resJson.access_token, clientId, clientSecret, userAgent);
  }

  /**
   * Creates an authorization URL to be given to the user so they can give access to their Reddit account
   *
   * @param options.clientId - The Client ID generated by Reddit during app registration.
   * @param options.state - A string of your choosing. It should be random and unique.
   * This value will be returned when the user visits redirectUri after allow your app access.
   * @param options.redirectUri - The redirect_uri specified during app registration.
   * @param options.duration - One of `temporary` or `permanent`. Choose `temporary` if you are performing a one-time request for the user.
   * Choose `permanent` if you are performing ongoing tasks for the user.
   * @param options.scope - An array of scope strings which specify what areas of the Reddit api the bearer token can oerform.
   *
   * @returns an authorization URL to be given to the user so they can give access to their Reddit account
   */
  static createAuthUrl(options: {
    clientId: string;
    state: string;
    redirectUri: string;
    duration: "temporary" | "permanent";
    scope: Scope[];
  }): string {
    const { clientId, state, redirectUri, duration, scope } = options;
    let scopes = scope.join(" ");
    scopes = encodeURIComponent(scopes);
    return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=${duration}&scope=${scopes}`;
  }

  /**
   * Creates a Jsrwrap object with an access token after authenticating with Reddit through a code
   *
   * @param options.clientId - The Client ID generated by Reddit during app registration.
   * @param options.clientSecret - The secret generated by Reddit during app registration.
   * @param options.userAgent - The client's User-Agent. Should be unique and descriptive string. Include target platform, unique application identifier, a version string,
   * and your username as contact information. E.g. `<platform>:<app ID>:<version string> (by /u/<reddit username>)`
   * @param options.redirectUri - The redirect_uri specified during app registration.
   * @param options.code - A one-time use code obtained from the redirect URI given after the user allows access to their Reddit account
   * from the url created by {@link Jsrwrap.createAuthUrl}
   *
   * @returns a Jsrwrap object with a valid access token
   *
   * @throws {@link OAuthError}
   * Thrown if an error occurs during the authentication process
   */
  static async fromAuthCode(options: {
    clientId: string;
    clientSecret: string;
    userAgent: string;
    redirectUri: string;
    code: string;
  }): Promise<Jsrwrap> {
    const { clientId, clientSecret, userAgent, redirectUri, code } = options;
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;
    const res = await this.retrieveAccessToken({
      httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(clientId, clientSecret),
      body,
      userAgent,
    });

    if (res.status !== 200) {
      await res.body?.cancel();
      if (res.status === 401) {
        throw new OAuthError("Invalid clientId or clientSecret");
      }
      if (res.status === 500) {
        throw new OAuthError(
          "redirectUri does not match the one registered to your app"
        );
      }
      if (res.status === 404) {
        throw new OAuthError("The code is expired or has already been used");
      }
      throw new OAuthError(
        "An error has occured during the authentication process"
      );
    }

    const resJson = (await res.json()) as accessTokenJsonResponse;

    return new Jsrwrap(
      resJson.access_token,
      clientId,
      clientSecret,
      userAgent,
      resJson.refresh_token
    );
  }

  /**
   * Creates a Jsrwrap object with an access token after authenticating with Reddit through Application Only OAuth
   * Used when you want to make API requests without a user context
   *
   * @param options.clientId - The Client ID generated by Reddit during app registration.
   * @param options.clientSecret - The secret generated by Reddit during app registration.
   * @param options.userAgent - The client's User-Agent. Should be unique and descriptive string. Include target platform, unique application identifier, a version string,
   * and your username as contact information. E.g. `<platform>:<app ID>:<version string> (by /u/<reddit username>)`
   * @param options.grantType - One of `client_credentials` or `https://oauth.reddit.com/grants/installed_client`.
   * When using `installed_client`, deviceId must also be passed in.
   * Use `installed_client` for installed app types and use `client_credentials` for confidential app types (web app / script).
   * @param options.deviceId - A unique, per-device ID. Required when using grantType=https://oauth.reddit.com/grants/installed_client. Must be between 20-30 characters.
   *
   * @returns a Jsrwrap object with a valid access token
   *
   * @throws {@link OAuthError}
   * Thrown if an error occurs during the authentication process
   */
  static async fromApplicationOnlyAuth(options: {
    clientId: string;
    clientSecret: string;
    userAgent: string;
    grantType:
      | "client_credentials"
      | "https://oauth.reddit.com/grants/installed_client";
    deviceId?: string;
  }) {
    const { clientId, clientSecret, userAgent, grantType, deviceId } = options;
    let body = `grant_type=${grantType}`;

    if (grantType === "https://oauth.reddit.com/grants/installed_client") {
      if (!deviceId) {
        throw new OAuthError(
          "deviceId is required when using the installed_client grant"
        );
      }
      if (deviceId.length < 20 || deviceId.length > 30) {
        throw new OAuthError("deviceId must be between 20-30 characters");
      }
      body = `${body}&device_id=${deviceId}`;
    }

    const res = await this.retrieveAccessToken({
      httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(clientId, clientSecret),
      body,
      userAgent,
    });

    if (res.status !== 200) {
      await res.body?.cancel();
      // Reddit returns a 401 response when Authorization value is not valid
      throw new OAuthError("Invalid clientId or clientSecret");
    }

    const resJson = (await res.json()) as accessTokenJsonResponse;

    return new Jsrwrap(resJson.access_token, clientId, clientSecret, userAgent);
  }

  async get<T>(uri: string, params?: Record<string, unknown>) {
    const res = await fetch(
      `https://oauth.reddit.com/${uri}?raw_json=1&${buildQueryString(params)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "User-Agent": this.userAgent,
        },
      }
    );

    if (res.status !== 200) {
      await res.body?.cancel();
      throw new Error("");
    }

    return (await res.json()) as T;
  }

  async post<T>(uri: string, params?: Record<string, unknown>) {
    const res = await fetch(`https://oauth.reddit.com/${uri}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": this.userAgent,
      },
      body: `raw_json=1&${buildQueryString(params)}`,
    });

    if (res.status !== 200) {
      await res.body?.cancel();
      throw new Error("");
    }

    return (await res.json()) as T;
  }

  async patch(uri: string, data: string) {
    const res = await fetch(`https://oauth.reddit.com/${uri}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        "User-Agent": this.userAgent,
      },
      body: data,
    });

    if (res.status !== 200) {
      await res.body?.cancel();
      throw new Error("");
    }
    return res.status;
  }

  getSubreddit(subreddit: string) {
    return new Subreddit(this, subreddit);
  }

  getSubmission(submissionId: string) {
    return new Submission(this, submissionId);
  }
}

function buildQueryString(params: Record<string, unknown> | undefined) {
  if (!params) return "";

  let queryString = "";
  Object.entries(params).forEach(([key, value], index) => {
    if (index === 0) {
      queryString = `${key}=${value}`;
    } else {
      queryString = `${queryString}&${key}=${value}`;
    }
  });
  return queryString;
}
