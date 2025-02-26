import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { ingredientsQuantity } from "@/common/helpers/ingredients-quantity";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    sauceId: 1,
    doughId: 1,
    sizeId: 1,
    ingredients: [],
  }),
  getters: {
    sauce: (state) => {
      const data = useDataStore();
      return (
        data.sauces.find((el) => el.id === state.sauceId) ?? data.sauces[0]
      );
    },
    dough: (state) => {
      const data = useDataStore();
      return (
        data.doughs.find((el) => el.id === state.doughId) ?? data.doughs[0]
      );
    },
    size: (state) => {
      const data = useDataStore();
      return data.sizes.find((el) => el.id === state.sizeId) ?? data.sizes[0];
    },
    ingredientsExtended: (state) => {
      const data = useDataStore();
      const pizzaIngredientsIds = state.ingredients.map(
        (el) => el.ingredientId,
      );
      return data.ingredients
        .filter((el) => pizzaIngredientsIds.includes(el.id))
        .map((el) => {
          return {
            ...el,
            count:
              state.ingredients.find((item) => item.ingredientId === el.id)
                ?.count ?? 0,
          };
        });
    },
    price: (state) => {
      return pizzaPrice(state);
    },
    ingredientQuantities: (state) => {
      return ingredientsQuantity(state);
    },
  },
  actions: {
    setIndex(index) {
      this.index = index;
    },
    setName(name){
      this.name = name
    },
    setSauceId(sauceId) {
      this.sauceId = sauceId;
    },
    setDoughId(doughId) {
      this.doughId = doughId;
    },
    setSizeId(sizeId) {
      this.sizeId = sizeId;
    },
    setIngredients(ingredients) {
      this.ingredients = ingredients;
    },
    addIngredient(ingredientId) {
      this.ingredients.push({ ingredientId, count: 1 });
    },
    deleteIngredient(ingredientId) {
      const ingredientIdx = this.ingredients.findIndex(
          (item) => item.ingredientId === ingredientId,
      );
      if (ingredientIdx !== -1) this.ingredients.splice(ingredientIdx, 1);
    },

    incrementIngredientQuantity(ingredientId) {
      const ingredientIdx = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId.value ,
      );
      if (ingredientIdx === -1) {
        this.addIngredient(ingredientId.value);
        return;
      } else {
        this.ingredients[ingredientIdx] = ingredientId.count
      }
    },

    setIngredientQuantity(ingredientId, count) {
      const ingredientIdx = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId,
      );
      if (count === 0) {
        this.ingredients.splice(ingredientIdx, 1);
        return;
      }
      if (ingredientIdx === -1 && count > 0) {
        this.addIngredient(ingredientId);
        return;
      } else if (ingredientIdx === -1) {
        return;
      }
      if (count === 0) {
        this.ingredients.splice(ingredientIdx, 1);
        return;
      }
      this.ingredients[ingredientIdx].count = count;
    },
    loadPizza(pizza) {
      this.index = pizza.index;
      this.name = pizza.name;
      this.sauceId = pizza.sauceId;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.ingredients = pizza.ingredients;
    },
  },
});
