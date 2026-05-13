import type { SortedIngredient } from "../../types";
import {
  getIngredientSection,
  groupIngredientsBySection,
} from "./sorted-shopping.utils";

const ingredient = (name: string): SortedIngredient => ({
  name,
  sources: ["Recipe"],
  count: 1,
  totalCount: 1,
  purchased: false,
});

describe("getIngredientSection", () => {
  it("classifies common produce", () => {
    expect(getIngredientSection("green beans")).toBe("Produce");
    expect(getIngredientSection("potatoes")).toBe("Produce");
    expect(getIngredientSection("tomatoes")).toBe("Produce");
    expect(getIngredientSection("cress")).toBe("Produce");
    expect(getIngredientSection("salad")).toBe("Produce");
  });

  it("classifies common meat, dairy, bakery, pantry and household items", () => {
    expect(getIngredientSection("anchovies")).toBe("Meat & Fish");
    expect(getIngredientSection("chicken thighs")).toBe("Meat & Fish");
    expect(getIngredientSection("pancetta")).toBe("Meat & Fish");
    expect(getIngredientSection("mozzarella")).toBe("Dairy & Eggs");
    expect(getIngredientSection("garlic bread")).toBe("Bakery");
    expect(getIngredientSection("bay leaf")).toBe("Pantry");
    expect(getIngredientSection("chicken stock")).toBe("Pantry");
    expect(getIngredientSection("chopped tomatoes")).toBe("Pantry");
    expect(getIngredientSection("dijon mustar")).toBe("Pantry");
    expect(getIngredientSection("macaroni")).toBe("Pantry");
    expect(getIngredientSection("rice")).toBe("Pantry");
    expect(getIngredientSection("foil")).toBe("Household");
  });

  it("classifies freezer staples", () => {
    expect(getIngredientSection("pizza")).toBe("Frozen");
  });

  it("falls back to Other when there is no known match", () => {
    expect(getIngredientSection("mystery ingredient")).toBe("Other");
  });

  it("prefers user category overrides over built-in guesses", () => {
    expect(
      getIngredientSection("chicken thighs", { "chicken thigh": "Pantry" }),
    ).toBe("Pantry");
  });

  it("applies user category overrides using the canonical singular key", () => {
    expect(getIngredientSection("onions", { onion: "Pantry" })).toBe("Pantry");
  });
});

describe("groupIngredientsBySection", () => {
  it("groups ingredients by grocery section order", () => {
    expect(
      groupIngredientsBySection([
        ingredient("foil"),
        ingredient("chicken"),
        ingredient("broccoli"),
        ingredient("rice"),
      ]),
    ).toEqual([
      {
        section: "Produce",
        ingredients: [ingredient("broccoli")],
      },
      {
        section: "Meat & Fish",
        ingredients: [ingredient("chicken")],
      },
      {
        section: "Pantry",
        ingredients: [ingredient("rice")],
      },
      {
        section: "Household",
        ingredients: [ingredient("foil")],
      },
    ]);
  });

  it("groups using user category overrides", () => {
    expect(
      groupIngredientsBySection([ingredient("onions"), ingredient("rice")], {
        onion: "Pantry",
      }),
    ).toEqual([
      {
        section: "Pantry",
        ingredients: [ingredient("onions"), ingredient("rice")],
      },
    ]);
  });
});
