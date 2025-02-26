<template lang="pug">
app-drag(
  :data-transfer="item"
  :draggable="getValue(item) < MAX_INGREDIENT_COUNT"
  @drag.passive="onDrug(item)"
)
  .filling
    img(
      :src="getPublicImage(item.image)"
      :alt="item.name"
    )
    span {{item.name}}

  app-counter(
    :value="count"
    :min-value=0
    :max-value="MAX_INGREDIENT_COUNT"
    :accent="false"
    @input="inputValue($event)"
  )
</template>

<script setup>
import {nextTick, toRef} from "vue";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";
import {getPublicImage} from "@/common/helpers/public-image";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const MAX_INGREDIENT_COUNT = 3;

const count = toRef(0);


const emits = defineEmits(["updateValue"]);

// eslint-disable-next-line no-unused-vars
const getValue = (ingredient) => {
  emits("updateValue", props.item, count.value);
  count.value = ingredient.count
  return count.value;
};

function onDrug(i) {
  // count.value = props.item.count +1
  count.value = i.count
  nextTick(() => inputValue(Number(i.count)))
}
const setValue = (val) => {
  count.value = Number(val)
  emits("updateValue", props.item, Number(val));
};
const inputValue = (count) => {
  return setValue(Math.min(MAX_INGREDIENT_COUNT, Number(count)));
};

// const getImage = (image) => {
//   return new URL(`../../assets/img/${image}`, import.meta.url).href;
// };

</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
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
