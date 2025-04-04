import { useDataStore } from "@/stores/data";

export const ingredientsQuantity = (pizza) => {
  const data = useDataStore();

  if (
    pizza.ingredients.length &&
    typeof pizza.ingredients[0].ingredientId === "number"
  ) {
    return data.ingredients.reduce((acc, val) => {
      acc[val.id] =
        pizza.ingredients.find((item) => item.ingredientId === val.id)
          ?.quantity ?? 0;
      return acc;
    }, {});
  } else {
    return data.ingredients.reduce((acc, val) => {
      acc[val.id] =
        pizza.ingredients.find((item) => item.ingredientId === val.value)
          ?.count ?? 0;
      return acc;
    }, {});
  }
};
