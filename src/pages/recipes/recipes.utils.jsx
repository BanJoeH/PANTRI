import { notification } from "../../App/app.utils";

export const removeFromRecipes = async (event, ref) => {
  event.preventDefault();
  if (
    window.confirm("Are you sure you want to permanently delete this recipe?")
  ) {
    let id = event.target.value;

    ref
      .doc(id)
      .delete()
      .then(() => {
        notification("", "Deleted", "danger");
      })
      .catch((error) => {
        console.log("error removing document", error);
      });
  }
};
