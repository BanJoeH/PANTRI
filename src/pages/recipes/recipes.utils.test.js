import * as utils from "./recipes.utils";
import { data } from "./testdata";

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
const sausageGnocchiBake = {
  id: "e201LhvoaeUCESXKAYRj",
  link: "",
  ingredients: [
    "sausages",
    "gnocchi",
    "mozzarella",
    "chopped tomatoes",
    "spinach",
    "fennel",
    "garlic",
  ].map((ingredient) => ({ name: ingredient })),
  name: "sausage gnocchi bake",
};
describe("recipeUtils filterRecipesByIngredientAndName", () => {
  it("should return a list with length of 3", () => {
    expect(
      utils.filteredRecipesByIngredientAndName(data, "chicken").length,
    ).toEqual(3);
  });

  it("should return all data in recipeList", () => {
    expect(utils.filteredRecipesByIngredientAndName(recipeList, "")).toEqual(
      data,
    );
  });

  it("should return only recipe diyNandos based on name", () => {
    expect(utils.filteredRecipesByIngredientAndName(data, "diy")).toEqual([
      diyNandos,
    ]);
  });

  it("should return only recipe diyNandos, ignoring case", () => {
    expect(utils.filteredRecipesByIngredientAndName(data, "DiY")).toEqual([
      diyNandos,
    ]);
  });

  it("should return only recipe sausageGnocchiBake, based on ingredient fennel", () => {
    expect(utils.filteredRecipesByIngredientAndName(data, "fennel")).toEqual([
      sausageGnocchiBake,
    ]);
  });

  it("should return an empty array", () => {
    expect(utils.filteredRecipesByIngredientAndName([], "")).toEqual([]);
  });

  it("should not error with empty arguements", () => {
    expect(utils.filteredRecipesByIngredientAndName()).toEqual([]);
  });
});
