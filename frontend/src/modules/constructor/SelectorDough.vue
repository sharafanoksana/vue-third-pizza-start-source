<template lang="pug">
.content__dough
  .sheet
    h2.title.title--small.sheet__title Выберите тесто
    .sheet__content.dough
      label.dough__input(
        v-for="doughType in dataStore.doughs"
        :key="doughType.id"
      )
        input(
          type="radio"
          name="dough"
          :value="doughType.id"
          :checked="doughType.id === modelValue"
          class="visually-hidden"
          @input="emit('update:modelValue', doughType.id)"
        )
        img(
          :src="getPublicImage(doughType.image)"
          :alt="doughType.name"
        )
        b {{doughType.name}}
        span {{ doughType.description }}
</template>

<script setup>
import {useDataStore} from "@/stores/data";
import {getPublicImage} from "@/common/helpers/public-image";

const props = defineProps({
  modelValue:{
    type: Number,
    required: true,
  },
})
const dataStore = useDataStore()
const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};

const emit = defineEmits(["update:modelValue"])
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  img {
    @include p_center-v;

    width: 36px;
    height: 36px;

    transition: 0.3s;

    border-radius: 50%;
  }

  b {
    @include r-s16-h19;
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &:hover {
    img {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + img {
      box-shadow: $shadow-large;
    }

    &.visually-hidden {
      display: none;
    }
  }
}
</style>
