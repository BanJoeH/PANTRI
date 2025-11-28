import * as utils from "./app.utils";
import { data } from "../pages/recipes/testdata";

const recipeList = data;
const diyNandos = {
  id: "s5zIC9lDBMGRpORsCGC2",
  link: "",
  name: "diy nandos",
  ingredients: [
    "chicken thighs",
    "nandos sauce",
    "potatoes",
    "garlic bread",
    "broccoli",
    "green beans",
  ].map((ingredient) => ({ name: ingredient })),
};

describe("findRecipe", () => {
  it("returns null if args are wrong", () => {
    expect(utils.findRecipe()).toEqual(null);
  });

  it("returns diyNandos with recipeId of `s5zIC9lDBMGRpORsCGC2`", () => {
    expect(utils.findRecipe(diyNandos.id, recipeList)).toEqual(diyNandos);
  });

  it("returns null if not found", () => {
    expect(utils.findRecipe("alkjshdla", recipeList)).toEqual(null);
  });
});

describe("filterRecipeOut", () => {
  it("returns null if args are wrong", () => {
    expect(utils.filterRecipeOut()).toEqual(null);
  });

  it("returns diyNandos with recipeId of `s5zIC9lDBMGRpORsCGC2`", () => {
    expect(utils.filterRecipeOut(diyNandos.id, recipeList)).toEqual(
      expect.not.arrayContaining([diyNandos]),
    );
  });

  it("returns full recipeList if not found", () => {
    expect(utils.filterRecipeOut("alkjssdl", recipeList)).toEqual(recipeList);
  });
});
