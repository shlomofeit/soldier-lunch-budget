import assert from "node:assert";
import { mock, test } from "node:test";

test("spies on a function", () => {
  const sum = mock.fn((a, b) => {
    return a + b;
  });
});
