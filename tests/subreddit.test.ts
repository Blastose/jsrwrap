import {
  describe,
  it,
  beforeAll,
} from "https://deno.land/std@0.178.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import test_data from "../test_data/test_data.json" assert { type: "json" };
import { Jsrwrap } from "../src/jsrwrap.ts";
import { Subreddit } from "../src/subreddit.ts";

describe("Subreddit methods", () => {
  let subreddit: Subreddit;

  beforeAll(async () => {
    const reddit = new Jsrwrap(
      "N/A",
      test_data.CLIENT_ID,
      test_data.CLIENT_SECRET,
      "web:JsrwrapApiWrapper:v0.0.1",
      test_data.REFRESH_TOKEN
    );
    await reddit.refreshAccessToken();
    subreddit = reddit.getSubreddit("python");
  });

  // Test may fail if a new post becomes the top of all time
  it("should get Top submissions of all time", async () => {
    const python = await subreddit.getSubmissions({
      sort: "top",
      params: { t: "all" },
    });
    assertEquals(
      python[0].title,
      "Lad wrote a Python script to download Alexa voice recordings, he didn't expect this email."
    );
  });

  it("should only get 5 submissions", async () => {
    const python = await subreddit.getSubmissions({
      sort: "new",
      params: { limit: 5 },
    });
    assertEquals(python.length, 5);
  });

  it("should get the subreddit about info", async () => {
    const about = await subreddit.getAbout();
    assertEquals(about.title, "Python");
  });
});
