<template lang="pug">
.content__diameter
  .sheet
    h2.title.title--small.sheet__title Выберите размер
    .sheet__content.diameter
      label.diameter__input(
        v-for="sizeType in dataStore.sizes"
        :key="sizeType.id"
        :class="`diameter__input--${sizeType.value}`"
      )
        input(
          type="radio"
          name="diameter"
          :value="sizeType.id"
          class="visually-hidden"
          :checked="sizeType.id === modelValue"
          @input="emit('update:modelValue', sizeType.id)"
        )
        span {{sizeType.name}}
</template>

<script setup>
import {useDataStore} from "@/stores/data";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
const dataStore = useDataStore()
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("/api/public/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }

    &.visually-hidden {
      display: none;
    }
  }
}
</style>
