<template lang="pug">
.content__ingredients
  .sheet
    h2.title.title--small.sheet__title Выберите ингредиенты
    .sheet__content.ingredients
      selector-sauce(
        @check="checkSauce"
      )
      .ingredients__filling
        p Начинка:
        ul.ingredients__list
          li.ingredients__item(
            v-for="ingredientType in dataStore.ingredients"
            :key="ingredientType.id"
          )
            selector-ingredients-item(
              :item="ingredientType"
              @updateValue="updateSelectedIngredients"
            )
</template>

<script setup>
import SelectorSauce from "@/modules/constructor/SelectorSauce.vue";
import SelectorIngredientsItem from "@/modules/constructor/SelectorIngredientItem.vue";
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const emits = defineEmits(["checkSauce", "updateSelectedIngredients"]);

function checkSauce(e) {
  emits("checkSauce", e);
}

function updateSelectedIngredients(item, count) {
  item.count = count;
  if (count >= 1) {
    pizzaStore.setIngredientQuantity(item.value, count);
  } else {
    pizzaStore.deleteIngredient(item.value);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  img {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    box-sizing: border-box;
    padding: 4px;

    border-radius: 50%;
  }
}
</style>
