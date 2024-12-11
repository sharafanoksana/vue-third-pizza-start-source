<template lang="pug">
.content__ingredients
  .sheet
    h2.title.title--small.sheet__title Выберите ингредиенты
    .sheet__content.ingredients
      selector-sauce(
        :sauceList="sauceList"
        @check="checkSauce"
      )
      .ingredients__filling
        p Начинка:
        ul.ingredients__list
          li.ingredients__item(
            v-for="ingredientType in ingredientList"
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

const props = defineProps({
  sauceList: {
    type: Array,
    required: true,
  },
  ingredientList: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["checkSauce", 'updateSelectedIngredients']);

function checkSauce (e) {
  emits("checkSauce", e);
};

function updateSelectedIngredients(item, count) {
  item.count = count
  emits("updateSelectedIngredients", item);
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.sheet {
  padding-top: 25px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
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
