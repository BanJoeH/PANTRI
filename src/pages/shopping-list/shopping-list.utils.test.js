import {
  normalizeIngredient,
  normalizeIngredients,
  setPurchasedInRecipeIngredient,
  setPurchasedInShoppingList,
  setPurchasedInOddBits,
  buildSortedIngredients,
} from "./shopping-list.utils";

// Silence the "error toggling..." console.log inside the catch branches; we
// assert on the return value, the log itself isn't part of the contract.
beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => {
  jest.restoreAllMocks();
});

// ---------- normalizeIngredient ----------

describe("normalizeIngredient", () => {
  it("turns a string into a {name, purchased: false} object", () => {
    expect(normalizeIngredient("potatoes")).toEqual({
      name: "potatoes",
      purchased: false,
    });
  });

  it("preserves purchased when already true", () => {
    expect(normalizeIngredient({ name: "potatoes", purchased: true })).toEqual({
      name: "potatoes",
      purchased: true,
    });
  });

  it("defaults purchased to false when missing", () => {
    expect(normalizeIngredient({ name: "potatoes" })).toEqual({
      name: "potatoes",
      purchased: false,
    });
  });

  it("strips unknown fields", () => {
    expect(
      normalizeIngredient({ name: "potatoes", purchased: true, extra: "x" }),
    ).toEqual({ name: "potatoes", purchased: true });
  });
});

// ---------- normalizeIngredients ----------

describe("normalizeIngredients", () => {
  it("returns [] for undefined", () => {
    expect(normalizeIngredients(undefined)).toEqual([]);
  });

  it("returns [] for null", () => {
    expect(normalizeIngredients(null)).toEqual([]);
  });

  it("returns [] for empty array", () => {
    expect(normalizeIngredients([])).toEqual([]);
  });

  it("normalizes a mixed list of strings and objects", () => {
    expect(
      normalizeIngredients([
        "potatoes",
        { name: "carrots", purchased: true },
        { name: "onions" },
      ]),
    ).toEqual([
      { name: "potatoes", purchased: false },
      { name: "carrots", purchased: true },
      { name: "onions", purchased: false },
    ]);
  });
});

// ---------- buildSortedIngredients ----------

describe("buildSortedIngredients", () => {
  it("returns [] for empty inputs", () => {
    expect(buildSortedIngredients([], [])).toEqual([]);
    expect(buildSortedIngredients([], undefined)).toEqual([]);
  });

  it("flattens a single recipe into one row per ingredient", () => {
    const result = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [
            { name: "Potatoes", purchased: false },
            { name: "Onions", purchased: false },
          ],
        },
      ],
      [],
    );
    expect(result).toEqual([
      {
        name: "onions",
        sources: ["Curry"],
        count: 1,
        totalCount: 1,
        purchased: false,
      },
      {
        name: "potatoes",
        sources: ["Curry"],
        count: 1,
        totalCount: 1,
        purchased: false,
      },
    ]);
  });

  it("dedupes the same ingredient across recipes and aggregates counts", () => {
    const result = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [{ name: "potatoes", purchased: false }],
        },
        {
          id: "r2",
          name: "Stir-fry",
          ingredients: [{ name: "potatoes", purchased: false }],
        },
        {
          id: "r3",
          name: "Soup",
          ingredients: [{ name: "potatoes", purchased: false }],
        },
      ],
      [],
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      name: "potatoes",
      sources: ["Curry", "Stir-fry", "Soup"],
      count: 3,
      totalCount: 3,
      purchased: false,
    });
  });

  it("count reflects unpurchased only; totalCount reflects all", () => {
    const result = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [{ name: "potatoes", purchased: true }],
        },
        {
          id: "r2",
          name: "Stir-fry",
          ingredients: [{ name: "potatoes", purchased: false }],
        },
        {
          id: "r3",
          name: "Soup",
          ingredients: [{ name: "potatoes", purchased: false }],
        },
      ],
      [],
    );
    expect(result[0]).toMatchObject({
      name: "potatoes",
      count: 2,
      totalCount: 3,
      purchased: false,
    });
  });

  it("marks a row purchased only when every instance is purchased", () => {
    const allPurchased = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [{ name: "potatoes", purchased: true }],
        },
        {
          id: "r2",
          name: "Stir-fry",
          ingredients: [{ name: "potatoes", purchased: true }],
        },
      ],
      [],
    );
    expect(allPurchased[0]).toMatchObject({
      count: 0,
      totalCount: 2,
      purchased: true,
    });

    const onePurchased = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [{ name: "potatoes", purchased: true }],
        },
        {
          id: "r2",
          name: "Stir-fry",
          ingredients: [{ name: "potatoes", purchased: false }],
        },
      ],
      [],
    );
    expect(onePurchased[0]).toMatchObject({
      count: 1,
      totalCount: 2,
      purchased: false,
    });
  });

  it("groups ingredient names case-insensitively", () => {
    const result = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [{ name: "Potatoes", purchased: false }],
        },
        {
          id: "r2",
          name: "Stir-fry",
          ingredients: [{ name: "potatoes", purchased: false }],
        },
      ],
      [],
    );
    expect(result).toHaveLength(1);
    expect(result[0].totalCount).toBe(2);
  });

  it("includes oddBits with 'Odd Bits' as their source", () => {
    const result = buildSortedIngredients(
      [],
      [{ name: "Foil", purchased: false }],
    );
    expect(result).toEqual([
      {
        name: "foil",
        sources: ["Odd Bits"],
        count: 1,
        totalCount: 1,
        purchased: false,
      },
    ]);
  });

  it("merges an oddBit with a recipe ingredient sharing its name", () => {
    const result = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [{ name: "Potatoes", purchased: false }],
        },
      ],
      [{ name: "potatoes", purchased: true }],
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      name: "potatoes",
      sources: ["Curry", "Odd Bits"],
      count: 1, // the recipe one is still unpurchased
      totalCount: 2,
      purchased: false,
    });
  });

  it("filters out empty oddBit placeholder rows", () => {
    const result = buildSortedIngredients(
      [],
      [
        { name: "", purchased: false },
        { name: "foil", purchased: false },
        null,
      ],
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("foil");
  });

  it("normalizes legacy oddBits stored as raw strings", () => {
    const result = buildSortedIngredients([], ["foil"]);
    expect(result[0]).toMatchObject({
      name: "foil",
      purchased: false,
    });
  });

  it("returns rows sorted alphabetically", () => {
    const result = buildSortedIngredients(
      [
        {
          id: "r1",
          name: "Curry",
          ingredients: [
            { name: "zucchini", purchased: false },
            { name: "apples", purchased: false },
            { name: "milk", purchased: false },
          ],
        },
      ],
      [],
    );
    expect(result.map((r) => r.name)).toEqual(["apples", "milk", "zucchini"]);
  });
});

// ---------- Firestore writer test helpers ----------

const makeCollectionRef = (updateImpl = jest.fn().mockResolvedValue()) => {
  const update = updateImpl;
  const docFn = jest.fn(() => ({ update }));
  return { ref: { doc: docFn }, doc: docFn, update };
};

const makeProfileRef = (setImpl = jest.fn().mockResolvedValue()) => ({
  ref: { set: setImpl },
  set: setImpl,
});

// ---------- setPurchasedInRecipeIngredient ----------

describe("setPurchasedInRecipeIngredient", () => {
  const recipes = [
    {
      id: "r1",
      name: "Curry",
      ingredients: [
        { name: "potatoes", purchased: false },
        { name: "onions", purchased: false },
      ],
    },
    {
      id: "r2",
      name: "Stir-fry",
      ingredients: [{ name: "potatoes", purchased: false }],
    },
  ];

  it("updates only the matching recipe at the given index", async () => {
    const { ref, doc, update } = makeCollectionRef();
    const result = await setPurchasedInRecipeIngredient(
      "r1",
      0,
      true,
      recipes,
      ref,
    );

    expect(result).toBe("succeeded");
    expect(doc).toHaveBeenCalledWith("r1");
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith({
      ingredients: [
        { name: "potatoes", purchased: true },
        { name: "onions", purchased: false },
      ],
    });
  });

  it("does not touch other recipes (no fan-out)", async () => {
    const { ref, doc } = makeCollectionRef();
    await setPurchasedInRecipeIngredient("r1", 0, true, recipes, ref);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).not.toHaveBeenCalledWith("r2");
  });

  it("returns 'noop' when the recipe is not found and writes nothing", async () => {
    const { ref, doc } = makeCollectionRef();
    const result = await setPurchasedInRecipeIngredient(
      "missing",
      0,
      true,
      recipes,
      ref,
    );
    expect(result).toBe("noop");
    expect(doc).not.toHaveBeenCalled();
  });

  it("returns 'failed' when the write rejects", async () => {
    const update = jest.fn().mockRejectedValue(new Error("boom"));
    const { ref } = makeCollectionRef(update);
    const result = await setPurchasedInRecipeIngredient(
      "r1",
      0,
      true,
      recipes,
      ref,
    );
    expect(result).toBe("failed");
  });
});

// ---------- setPurchasedInShoppingList ----------

describe("setPurchasedInShoppingList", () => {
  const recipes = [
    {
      id: "r1",
      name: "Curry",
      ingredients: [
        { name: "Potatoes", purchased: false },
        { name: "onions", purchased: false },
      ],
    },
    {
      id: "r2",
      name: "Stir-fry",
      ingredients: [{ name: "potatoes", purchased: false }],
    },
    {
      id: "r3",
      name: "Salad",
      ingredients: [{ name: "lettuce", purchased: false }],
    },
  ];

  it("fans out to every recipe containing the ingredient", async () => {
    const { ref, doc, update } = makeCollectionRef();
    const result = await setPurchasedInShoppingList(
      "potatoes",
      true,
      recipes,
      ref,
    );

    expect(result).toBe("succeeded");
    expect(doc).toHaveBeenCalledWith("r1");
    expect(doc).toHaveBeenCalledWith("r2");
    expect(doc).not.toHaveBeenCalledWith("r3");
    expect(update).toHaveBeenCalledTimes(2);
  });

  it("matches case-insensitively", async () => {
    const { ref, update } = makeCollectionRef();
    await setPurchasedInShoppingList("POTATOES", true, recipes, ref);
    expect(update).toHaveBeenCalledTimes(2);
    // r1 had "Potatoes" (capital P) — still flipped:
    expect(update).toHaveBeenCalledWith({
      ingredients: [
        { name: "Potatoes", purchased: true },
        { name: "onions", purchased: false },
      ],
    });
  });

  it("returns 'noop' and writes nothing when no recipe matches", async () => {
    const { ref, doc } = makeCollectionRef();
    const result = await setPurchasedInShoppingList("kale", true, recipes, ref);
    expect(result).toBe("noop");
    expect(doc).not.toHaveBeenCalled();
  });

  it("returns 'failed' when any write rejects", async () => {
    const update = jest.fn().mockRejectedValue(new Error("boom"));
    const { ref } = makeCollectionRef(update);
    const result = await setPurchasedInShoppingList(
      "potatoes",
      true,
      recipes,
      ref,
    );
    expect(result).toBe("failed");
  });
});

// ---------- setPurchasedInOddBits ----------

describe("setPurchasedInOddBits", () => {
  it("sets the matching odd bit to the new value", async () => {
    const { ref, set } = makeProfileRef();
    const result = await setPurchasedInOddBits(
      "foil",
      true,
      [
        { name: "foil", purchased: false },
        { name: "cling film", purchased: false },
      ],
      ref,
    );

    expect(result).toBe("succeeded");
    expect(set).toHaveBeenCalledWith(
      {
        oddBits: [
          { name: "foil", purchased: true },
          { name: "cling film", purchased: false },
        ],
      },
      { merge: true },
    );
  });

  it("matches case-insensitively", async () => {
    const { ref, set } = makeProfileRef();
    await setPurchasedInOddBits(
      "FOIL",
      true,
      [{ name: "Foil", purchased: false }],
      ref,
    );
    expect(set).toHaveBeenCalledWith(
      { oddBits: [{ name: "Foil", purchased: true }] },
      { merge: true },
    );
  });

  it("returns 'noop' and writes nothing when no oddBit matches", async () => {
    const { ref, set } = makeProfileRef();
    const result = await setPurchasedInOddBits(
      "kale",
      true,
      [{ name: "foil", purchased: false }],
      ref,
    );
    expect(result).toBe("noop");
    expect(set).not.toHaveBeenCalled();
  });

  it("handles undefined oddBits without throwing", async () => {
    const { ref, set } = makeProfileRef();
    const result = await setPurchasedInOddBits("foil", true, undefined, ref);
    expect(result).toBe("noop");
    expect(set).not.toHaveBeenCalled();
  });

  it("normalizes legacy string oddBits before writing", async () => {
    const { ref, set } = makeProfileRef();
    await setPurchasedInOddBits("foil", true, ["foil", "cling film"], ref);
    expect(set).toHaveBeenCalledWith(
      {
        oddBits: [
          { name: "foil", purchased: true },
          { name: "cling film", purchased: false },
        ],
      },
      { merge: true },
    );
  });

  it("filters out null/empty oddBit entries before matching", async () => {
    const { ref, set } = makeProfileRef();
    const result = await setPurchasedInOddBits(
      "foil",
      true,
      [null, undefined, { name: "foil", purchased: false }],
      ref,
    );
    expect(result).toBe("succeeded");
    expect(set).toHaveBeenCalledWith(
      { oddBits: [{ name: "foil", purchased: true }] },
      { merge: true },
    );
  });

  it("returns 'failed' when the write rejects", async () => {
    const set = jest.fn().mockRejectedValue(new Error("boom"));
    const { ref } = makeProfileRef(set);
    const result = await setPurchasedInOddBits(
      "foil",
      true,
      [{ name: "foil", purchased: false }],
      ref,
    );
    expect(result).toBe("failed");
  });
});
