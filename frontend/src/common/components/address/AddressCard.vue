<template lang="pug">
.sheet
  .address-form(v-if="!editeMode")
    .address-form__header
      b {{getAddress(address)}}
      .address-form__edit
        button.button.icon(@click="editeMode = true")
          span.visually-hidden Изменить адрес
    p(v-if="address.name.includes('self')") {{getAddress(address)}}
    p(v-else) ул.{{address?.street}}, д.{{address?.building}}{{address?.flat ? `, кв.${address?.flat}`:"."}}
    small {{ address?.comment }}

  address-edit-form(
      v-else
      :address="address"
      :title="`Адрес ${index}`"
      @delete="deleteAddress"
      @save="save"
    )
</template>

<script setup>
import { ref } from "vue";
import AddressEditForm from "@/common/components/address/AddressEditForm.vue";

const props = defineProps({
  address: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["save", "delete"]);
const editeMode = ref(false);

const save = (addres) => {
  emits("save", addres);
  editeMode.value = false;
};
const deleteAddress = () => {
  emits("delete");
  editeMode.value = false;
};
const getAddress = (address) => {
  return address.name.includes('self') ? "Самовынос" : address.name
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/blocks/button";
@import "@/assets/scss/visually-hidden";

.icon {
  cursor: pointer;
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("/api/public/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}

</style>
