import { useDataStore } from "@/stores";
import  doughJSON  from "@/tests/__mocks__/data/dough.json";
import  sizeJSON  from "@/tests/__mocks__/data/sizes.json";
import  ingredientsJSON  from "@/tests/__mocks__/data/ingredients.json";
import  saucesJSON  from "@/tests/__mocks__/data/sauces.json";
import  miscJSON  from "@/tests/__mocks__/data/misc.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

export const prepareData = () => {
  const dataStore = useDataStore();
  dataStore.doughs = doughJSON.map(normalizeDough);
  dataStore.sizes = sizeJSON.map(normalizeSize);
  dataStore.ingredients = ingredientsJSON.map(normalizeIngredients);
  dataStore.sauces = saucesJSON.map(normalizeSauces);
  dataStore.misc = miscJSON;
};
