import { useEffect } from "react";

const IngredientInput = ({ inputList, setInputList }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { ingredient: "", ingredientRef: null }]);
  };

  const addIngredientOnEnter = (event) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };

  useEffect(() => {
    if (inputList[inputList.length - 1].ingredientRef) {
      inputList[inputList.length - 1].ingredientRef.focus();
    }
  }, [inputList.length]);

  return (
    // <div className=" w-100 center">
    inputList.map((x, i) => {
      return (
        <div
          key={i}
          className="flex flex-row w-50-ns mv1 w-90 center b--gray ba bg-transparent br2  "
        >
          <input
            value={x.ingredient}
            name="ingredient"
            placeholder="Ingredient"
            onChange={(e) => handleInputChange(e, i)}
            onKeyDown={(e) => addIngredientOnEnter(e)}
            ref={(e) => (x.ingredientRef = e)}
            className="w-100 pr-5 pv2 br2 ph1 flex-grow-2hover-bg-light-gray bn input-reset "
            autoComplete="off"
          />
          <div className="flex">
            {inputList.length - 1 === i && (
              <button
                onClick={handleAddClick}
                className="ba bg-transparent pointer b--light-silver br2 hover-bg-light-gray "
              >
                +
              </button>
            )}
            {inputList.length !== 1 && (
              <button
                onClick={() => handleRemoveClick(i)}
                className="ba bg-transparent pointer b--light-silver br2 hover-bg-light-gray "
              >
                x
              </button>
            )}
          </div>
        </div>
      );
    })
    // </div>
  );
};
export default IngredientInput;
