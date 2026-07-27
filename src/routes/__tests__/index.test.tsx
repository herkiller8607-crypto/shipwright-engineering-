import { describe, it, expect } from "vitest";
import { resolveBusinessName, fetchBusinessName } from "../index";

// ---------------------------------------------------------------------------
// resolveBusinessName — pure function tests
// ---------------------------------------------------------------------------
describe("resolveBusinessName", () => {
  it("returns trimmed businessName from a valid config (happy path)", () => {
    const result = resolveBusinessName({ businessName: "  Acme Corp  " });
    expect(result).toBe("Acme Corp");
  });

  it("returns trimmed name even when no surrounding whitespace", () => {
    const result = resolveBusinessName({ businessName: "Shipwright" });
    expect(result).toBe("Shipwright");
  });

  it("falls back when businessName is an empty string", () => {
    const result = resolveBusinessName({ businessName: "" });
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when businessName is whitespace only", () => {
    const result = resolveBusinessName({ businessName: "   \t\n  " });
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when businessName key is missing", () => {
    const result = resolveBusinessName({});
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when businessName is not a string (number)", () => {
    const result = resolveBusinessName({ businessName: 123 });
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when businessName is null", () => {
    const result = resolveBusinessName({ businessName: null });
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when businessName is undefined", () => {
    const result = resolveBusinessName({ businessName: undefined });
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when config is null", () => {
    const result = resolveBusinessName(null);
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when config is undefined", () => {
    const result = resolveBusinessName(undefined);
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when config is a primitive (string)", () => {
    const result = resolveBusinessName("not an object");
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when config is an array", () => {
    const result = resolveBusinessName([{ businessName: "Test" }]);
    expect(result).toBe("Shipwright Engineering");
  });

  it("trims leading whitespace", () => {
    const result = resolveBusinessName({ businessName: "   Leading" });
    expect(result).toBe("Leading");
  });

  it("trims trailing whitespace", () => {
    const result = resolveBusinessName({ businessName: "Trailing   " });
    expect(result).toBe("Trailing");
  });

  it("trims both leading and trailing whitespace while keeping internal spaces", () => {
    const result = resolveBusinessName({
      businessName: "  My  Business  Name  ",
    });
    expect(result).toBe("My  Business  Name");
  });
});

// ---------------------------------------------------------------------------
// fetchBusinessName — async integration tests (file-level failures)
// ---------------------------------------------------------------------------
describe("fetchBusinessName", () => {
  it("returns the business name when readFn returns valid JSON with a name", async () => {
    const readFn = async () => JSON.stringify({ businessName: "Acme Corp" });
    const result = await fetchBusinessName(readFn);
    expect(result).toBe("Acme Corp");
  });

  it("falls back when readFn throws (file missing)", async () => {
    const readFn = async () => {
      throw new Error("ENOENT: no such file or directory");
    };
    const result = await fetchBusinessName(readFn);
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when readFn returns invalid JSON", async () => {
    const readFn = async () => "not-valid-json{{{";
    const result = await fetchBusinessName(readFn);
    expect(result).toBe("Shipwright Engineering");
  });

  it("falls back when readFn returns empty string", async () => {
    const readFn = async () => "";
    const result = await fetchBusinessName(readFn);
    expect(result).toBe("Shipwright Engineering");
  });

  it("delegates to resolveBusinessName for business name logic when JSON is valid", async () => {
    // businessName empty inside valid JSON → resolveBusinessName kicks in
    const readFn = async () => JSON.stringify({ businessName: "" });
    const result = await fetchBusinessName(readFn);
    expect(result).toBe("Shipwright Engineering");
  });

  it("returns trimmed name from valid JSON with surrounding whitespace", async () => {
    const readFn = async () =>
      JSON.stringify({ businessName: "  Trimmed Co  " });
    const result = await fetchBusinessName(readFn);
    expect(result).toBe("Trimmed Co");
  });
});
