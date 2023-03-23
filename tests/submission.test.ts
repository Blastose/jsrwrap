import {
  describe,
  it,
  beforeAll,
} from "https://deno.land/std@0.178.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import test_data from "../test_data/test_data.json" assert { type: "json" };
import { Jsrwrap } from "../src/jsrwrap.ts";
import { Submission } from "../src/submission.ts";
import type { Replies } from "../src/types/comment.ts";

function printReplies(replies: Replies) {
  replies.forEach((c) => {
    if (c.type === "comment") {
      // console.log(c.body);
      c.body;
      printReplies(c.replies);
    } else {
      // console.log(`Load ${c.count} more comments`);
      c.count;
    }
  });
}

function printCommentTree(response: Awaited<ReturnType<Submission["fetch"]>>) {
  const comments = response.comments;
  comments.forEach((comm) => {
    if (comm.type === "comment") {
      // console.log(comm.body);
      comm.body;
      printReplies(comm.replies);
    }
  });
}

describe("Submission methods", () => {
  let reddit: Jsrwrap;

  beforeAll(async () => {
    reddit = new Jsrwrap(
      "N/A",
      test_data.CLIENT_ID,
      test_data.CLIENT_SECRET,
      "web:JsrwrapApiWrapper:v0.0.1",
      test_data.REFRESH_TOKEN
    );
    await reddit.refreshAccessToken();
  });

  it("fetches submission response and parses it", async () => {
    // Normal submission
    const submissionNextJs = await reddit.getSubmission("10mr90y").fetch();
    printCommentTree(submissionNextJs);

    // Submission with continue this thread
    const submissionCounting = await reddit.getSubmission("116gtzi").fetch();
    printCommentTree(submissionCounting);

    // Submission with load more comments as direct child
    const submissionAskreddit = await reddit.getSubmission("1135sc2").fetch();

    printCommentTree(submissionAskreddit);
  });

  it("gets more children comments", async () => {
    const childrenNextJs = await reddit
      .getSubmission("1135sc2")
      .getMoreChildren({
        children: [
          "j8py668",
          "j8qwy1n",
          "j8qmron",
          "j8pgj4s",
          "j8ownzd",
          "j8piyml",
          "j8pz6mm",
          "j8p7pe9",
          "j8qayoi",
          "j8q9ok7",
          "j8q8dx5",
          "j8qyrbt",
          "j8pig1n",
          "j8py4ik",
          "j8q1b1b",
        ],
        limit_children: false,
        sort: "confidence",
      });
    assertEquals(childrenNextJs.length, 15);
  });

  it("gets more children comments", async () => {
    await reddit.getSubmission("11fifjy").getMoreChildren({
      children: ["jakiqc4"],
      limit_children: false,
      sort: "confidence",
    });
  });
});
