<template lang="pug">
.ingredients__sauce
  p Основной соус:
  label.radio.ingredients__input(
    v-for="sauceType in dataStore.sauces"
    :key="sauceType.id"
  )
    input(
      type="radio"
      name="sauce"
      :value="sauceType.id"
      @input="emit('check', $event.target.value)"
      :checked="getChecked(sauceType)"
    )
    span {{sauceType.name}}
</template>

<script setup>
import {useDataStore} from "@/stores/data";
import {usePizzaStore} from "@/stores/pizza";

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()
const getChecked = (sauceType) => {
  return pizzaStore.sauceId === sauceType.id
}

const emit = defineEmits(["check"]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
