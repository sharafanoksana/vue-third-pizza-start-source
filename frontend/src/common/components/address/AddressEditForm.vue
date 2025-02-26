<template lang="pug">
form.address-form.address-form--opened.sheet(@submit.prevent="save")
  .address-form__header
    b {{title}}
  .address-form__wrapper
    .address-form__input
      label.input
        span Название адреса*
        input(
          v-model="name"
          type='text'
          name="addr-name"
          placeholder="Введите название адреса"
          required
        )
    .address-form__input.address-form__input--size--normal
      label.input
        span Улица*
        input(
          v-model="street"
          type=type='text'
          name="addr-street"
          placeholder="Введите название улицы"
          required
        )
    .address-form__input.address-form__input--size--small
      label.input
        span Дом*
        input(
          v-model="building"
          type="text"
          name="add-building"
          placeholder="Введите номер дома"
          required
        )
    .address-form__input.address-form__input--size--small
      label.input
        span Квартира
        input(
          v-model="flat"
          type="text"
          name="addr-apartment"
          placeholder="Введите № квартиры"
        )
    .address-form__input
      label.input
        span Комментарий
        input(
          v-model="comment"
          type="text"
          name="addr-comment"
          placeholder="Введите комментарий"
        )
  .address-form__buttons
    button.button.button--transparent(
      type='button'
      @click="emit('delete')"
    ) Удалить
    button.button(
      type="submit"
    ) Сохранить
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  address: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: "",
    required: true,
  },
});
const emit = defineEmits(["delete", "save"]);

const name = ref(props.address?.name ?? "");
const street = ref(props.address?.street ?? "");
const building = ref(props.address?.building ?? "");
const flat = ref(props.address?.flat ?? "");
const comment = ref(props.address?.comment ?? "");

const save = () => {
  emit("save", {
    name: name.value,
    street: street.value,
    building: building.value,
    flat: flat.value,
    comment: comment.value,
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/blocks/button";
@import "@/assets/scss/blocks/input";
@import "@/assets/scss/visually-hidden";

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}
</style>
