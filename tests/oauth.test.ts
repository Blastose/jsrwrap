import { describe, it } from "https://deno.land/std@0.178.0/testing/bdd.ts";
import {
  assertEquals,
  assertInstanceOf,
  assertRejects,
} from "https://deno.land/std@0.178.0/testing/asserts.ts";
import test_data from "../test_data/test_data.json" assert { type: "json" };
import { Jsrwrap } from "../mod.ts";
import { OAuthError } from "../src/jsrwrap.ts";

describe("Jsrwrap static methods", () => {
  it("generates a valid authorization URL", () => {
    assertEquals(
      Jsrwrap.createAuthUrl({
        clientId: "T_OJ428Xl6SYT52iyI8VKA",
        state: "state_123",
        redirectUri: "http://localhost:5173",
        duration: "permanent",
        scope: ["*"],
      }),
      "https://www.reddit.com/api/v1/authorize?client_id=T_OJ428Xl6SYT52iyI8VKA&response_type=code&state=state_123&redirect_uri=http://localhost:5173&duration=permanent&scope=*"
    );
  });

  it("encodes the clientId and clientSecret", () => {
    assertEquals(
      Jsrwrap.encodeClientIdAndSecret(
        "6779ef20e75817b79602",
        "asekldjlmascnekjnn_3jdk"
      ),
      "Njc3OWVmMjBlNzU4MTdiNzk2MDI6YXNla2xkamxtYXNjbmVram5uXzNqZGs="
    );
  });
});

describe("Jsrwrap token retrieval", () => {
  // Code is one-time use so repeated calls to this test should fail
  // You can get a code from the above link and extracting the code from the query param
  it.ignore(
    "reddit returns a JSON with an access token when authenticating with code",
    async () => {
      const reddit = await Jsrwrap.fromAuthCode({
        clientId: test_data.CLIENT_ID,
        clientSecret: test_data.CLIENT_SECRET,
        redirectUri: "http://localhost:5173",
        code: "6YpuQ4HzXDTojWm-QdOW-sAMVl4beQ",
        userAgent: "web:JsrwrapApiWrapper:v0.0.1",
      });
      assertInstanceOf(reddit, Jsrwrap);
    }
  );

  // Code needs to be valid for this test to pass, since Reddit api checks for a valid redirect_uri after it checks the code
  // You can get a code from the above link and extracting the code from the query param
  it.ignore(
    "throws an error when redirectUri does not match when authenticating with code",
    async () => {
      await assertRejects(
        async () => {
          await Jsrwrap.fromAuthCode({
            clientId: test_data.CLIENT_ID,
            clientSecret: test_data.CLIENT_SECRET,
            redirectUri: "http://notlocalhost:1234",
            code: "I7YzcJZcYRo3Hj473tMv6C4fPdiYtQ",
            userAgent: "web:JsrwrapApiWrapper:v0.0.1",
          });
        },
        OAuthError,
        "redirectUri does not match the one registered to your app"
      );
    }
  );

  it("throws an error when clientId or clientSecret is invalid when authenticating with code", async () => {
    await assertRejects(
      async () =>
        await Jsrwrap.fromAuthCode({
          clientId: "notvalidclientid",
          clientSecret: test_data.CLIENT_SECRET,
          redirectUri: "http://localhost:5173",
          code: "flAqmMMLowCKKagZLMRR72yJcs7rrg",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        }),
      OAuthError,
      "Invalid clientId or clientSecret"
    );
  });

  it("throws an error when authenticating with invalid code", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromAuthCode({
          clientId: test_data.CLIENT_ID,
          clientSecret: test_data.CLIENT_SECRET,
          redirectUri: "http://localhost:5173",
          code: "flAqmMMLowCKKagZLMRR72yJcs7rrg",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "The code is expired or has already been used"
    );
  });

  it("reddit returns a JSON with an access token when authenticating with username and password for a script app", async () => {
    const reddit = await Jsrwrap.fromUsernamePassword({
      clientId: test_data.SCRIPT_CLIENT_ID,
      clientSecret: test_data.SCRIPT_CLIENT_SECRET,
      username: test_data.USERNAME,
      password: test_data.PASSWORD,
      userAgent: "web:JsrwrapApiWrapper:v0.0.1",
    });
    assertInstanceOf(reddit, Jsrwrap);
  });

  it("throws an error when clientId or clientSecret is invalid when authenticating with username and password for a script app", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromUsernamePassword({
          clientId: "notvalidclientid",
          clientSecret: test_data.SCRIPT_CLIENT_SECRET,
          username: test_data.USERNAME,
          password: test_data.PASSWORD,
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "Invalid clientId or clientSecret"
    );
  });

  it("throws an error when authenticating with username and password for a non-script app", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromUsernamePassword({
          clientId: test_data.CLIENT_ID,
          clientSecret: test_data.CLIENT_SECRET,
          username: test_data.USERNAME,
          password: test_data.PASSWORD,
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "Only script apps may use password auth"
    );
  });

  it("throws an error when authenticating with incorrect username and password for a script app", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromUsernamePassword({
          clientId: test_data.SCRIPT_CLIENT_ID,
          clientSecret: test_data.SCRIPT_CLIENT_SECRET,
          username: "fakeusernamehere",
          password: "fakepasswordhere",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "Username or password does not match the account used to register the app with the given clientId and clientSecret"
    );
  });

  it("reddit returns a JSON with an access token when authenticating with application only OAuth and client_credentials", async () => {
    const reddit = await Jsrwrap.fromApplicationOnlyAuth({
      clientId: test_data.CLIENT_ID,
      clientSecret: test_data.CLIENT_SECRET,
      grantType: "client_credentials",
      userAgent: "web:JsrwrapApiWrapper:v0.0.1",
    });
    assertInstanceOf(reddit, Jsrwrap);
  });

  it("throws an error when clientId or clientSecret is invalid for application only OAuth and client_credentials", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromApplicationOnlyAuth({
          clientId: "jajsleij3kjkajds",
          clientSecret: test_data.CLIENT_SECRET,
          grantType: "https://oauth.reddit.com/grants/installed_client",
          deviceId: "bxkbocifqjjxjbdamkfq",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "Invalid clientId or clientSecret"
    );
  });

  it("reddit returns a JSON with an access token when authenticating with application only OAuth and installed_client", async () => {
    const reddit = await Jsrwrap.fromApplicationOnlyAuth({
      clientId: test_data.CLIENT_ID,
      clientSecret: test_data.CLIENT_SECRET,
      grantType: "https://oauth.reddit.com/grants/installed_client",
      deviceId: "bxkbocifqjjxjbdamkfq",
      userAgent: "web:JsrwrapApiWrapper:v0.0.1",
    });
    assertInstanceOf(reddit, Jsrwrap);
  });

  it("throws an error when clientId or clientSecret is invalid for application only OAuth and installed_client", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromApplicationOnlyAuth({
          clientId: "jajsleij3kjkajds",
          clientSecret: test_data.CLIENT_SECRET,
          grantType: "https://oauth.reddit.com/grants/installed_client",
          deviceId: "bxkbocifqjjxjbdamkfq",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "Invalid clientId or clientSecret"
    );
  });

  it("throws an error when deviceId is not given for application only OAuth and installed_client", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromApplicationOnlyAuth({
          clientId: test_data.CLIENT_ID,
          clientSecret: test_data.CLIENT_SECRET,
          grantType: "https://oauth.reddit.com/grants/installed_client",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "deviceId is required when using the installed_client grant"
    );
  });

  it("throws an error when deviceId is less than 20 characters for application only OAuth and installed_client", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromApplicationOnlyAuth({
          clientId: test_data.CLIENT_ID,
          clientSecret: test_data.CLIENT_SECRET,
          grantType: "https://oauth.reddit.com/grants/installed_client",
          deviceId: "sadjfkj",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "deviceId must be between 20-30 characters"
    );
  });

  it("throws an error when deviceId is greater than 30 characters for application only OAuth and installed_client", async () => {
    await assertRejects(
      async () => {
        await Jsrwrap.fromApplicationOnlyAuth({
          clientId: test_data.CLIENT_ID,
          clientSecret: test_data.CLIENT_SECRET,
          grantType: "https://oauth.reddit.com/grants/installed_client",
          deviceId: "sadjfkjasledjleksjadlkjseidjalskedjkasjkdjsdejdkjkdkjslj",
          userAgent: "web:JsrwrapApiWrapper:v0.0.1",
        });
      },
      OAuthError,
      "deviceId must be between 20-30 characters"
    );
  });

  it("refreshes the access token for non-application only OAuth", async () => {
    const reddit = new Jsrwrap(
      test_data.ACCESS_TOKEN,
      test_data.CLIENT_ID,
      test_data.CLIENT_SECRET,
      "web:JsrwrapApiWrapper:v0.0.1",
      test_data.REFRESH_TOKEN
    );
    await reddit.refreshAccessToken();
  });

  it("throws an error when refreshing access token with an invalid refresh token", async () => {
    const reddit = new Jsrwrap(
      test_data.ACCESS_TOKEN,
      test_data.CLIENT_ID,
      test_data.CLIENT_SECRET,
      "web:JsrwrapApiWrapper:v0.0.1",
      "invalid_refresh_token"
    );

    await assertRejects(
      async () => {
        await reddit.refreshAccessToken();
      },
      Error,
      "Invalid refresh_token"
    );
  });

  it("throws an error when refreshing access token without a refresh token", async () => {
    const reddit = new Jsrwrap(
      test_data.ACCESS_TOKEN,
      test_data.CLIENT_ID,
      test_data.CLIENT_SECRET,
      "web:JsrwrapApiWrapper:v0.0.1"
    );

    await assertRejects(
      async () => {
        await reddit.refreshAccessToken();
      },
      Error,
      "No refresh_token; cannot refresh access token"
    );
  });
});
