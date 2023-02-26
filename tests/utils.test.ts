import { buildQueryString } from "../src/utils/buildQueryString.ts";
import { describe, it } from "https://deno.land/std@0.178.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";

describe("buildQueryString", () => {
  it("builds the query string", () => {
    const result = buildQueryString({ t: "all", after: "t3qwert", count: 24 });
    assertEquals(result, "t=all&after=t3qwert&count=24");
  });

  it("returns an empty string when params are undefined", () => {
    const result = buildQueryString(undefined);
    assertEquals(result, "");
  });
});
