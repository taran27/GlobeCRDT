// tests/basic.test.ts
import { describe, it, expect } from "vitest";
import { GlobeCRDT } from "../src/index";

describe("GlobeCRDT basic convergence", () => {
  it("merges two peers correctly", () => {
    const alice = new GlobeCRDT("alice000"); // ← make them different
    const bob = new GlobeCRDT("bob00000");

    alice.insert(0, "Hello");
    bob.merge(alice.diff(bob.getVector()));

    bob.insert(5, " world");
    alice.merge(bob.diff(alice.getVector()));

    expect(alice.toString()).toBe("Hello world");
    expect(bob.toString()).toBe("Hello world");
  });
});
