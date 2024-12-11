<template lang="pug">
.content__diameter
  .sheet
    h2.title.title--small.sheet__title Выберите размер
    .sheet__content.diameter
      label.diameter__input(
        v-for="sizeType in sizeList"
        :key="sizeType.id"
        :class="`diameter__input--${sizeType.value}`"
      )
        input(
          type="radio"
          name="diameter"
          :value="sizeType.value"
          class="visually-hidden"
          :checked="sizeType.value === modelValue"
          @input="emit('update:modelValue', sizeType.value)"
        )
        span {{sizeType.name}}
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  sizeList: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.sheet {
  padding-top: 15px;

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
      background-image: url("@/assets/img/diameter.svg");
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
