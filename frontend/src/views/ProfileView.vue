<template lang="pug">
main.profile-content
  .profile.cart__title
    h1.title.title--big Мои данные

  form.cart-form(
      action='#'
      method='post'
  )
    .profile.cart__additional
      .cart-container--row
        img(
          :src="getPublicImage(authStore.user.avatar)"
          width='56'
          height='56'
          :alt='authStore.user.name'
        )
        h4.title.title--small {{authStore.user.name}}
      span.title.title--small Контактный телефон:
      span {{authStore.user.phone}}

    .layout__address(v-for="(address, index) in profileStore.addresses")
      address-card(
        v-if="address?.street !== 'self'"
        :key="address.id"
        :address="address"
        :index="index"
        @save="updateAddress(address, $event)"
        @delete="profileStore.removeAddress(address.id)"
      )

    .layout__button(
      v-if="!isNewAddressFormOpened"
    )
      button.button.button--border(
        type="button"
        @click="isNewAddressFormOpened = true"
      ) Добавить новый адрес

    .layout__address(
      v-else
      )
      address-edit-form(
        title="Новый адрес"
        @save="addAddress"
        @delete="isNewAddressFormOpened = false"
      )
</template>

<script setup>
import { useAuthStore, useProfileStore } from "@/stores";
import { getPublicImage } from "@/common/helpers/public-image";
import AddressCard from "@/common/components/address/AddressCard.vue";
import AddressEditForm from "@/common/components/address/AddressEditForm.vue";
import { ref } from "vue";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const isNewAddressFormOpened = ref();

const addAddress = async (address) => {
  await profileStore.addAddress(address);
  isNewAddressFormOpened.value = false;
};
const updateAddress = (address, data) => {
  profileStore.updateAddress({
    ...address,
    ...data,
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";
@import "@/assets/scss/blocks/cart-form";
@import "@/assets/scss/blocks/cart";
@import "@/assets/scss/blocks/cart-list";
@import "@/assets/scss/blocks/input";
@import "@/assets/scss/blocks/button";

.cart-form{
  gap: 20px;
}
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

.layout__address {
  :deep(.address-form) {
    $bl: &;

    position: relative;

    padding-top: 0;
    padding-bottom: 26px;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-bottom: 16px;
      padding: 0 16px;
    }

    small {
      @include l-s11-h13;

      display: block;

      padding: 0 16px;
    }
  }

  :deep(.address-form--opened) {
    .address-form__header {
      padding: 16px;
    }
  }

  :deep(.address-form__header) {
    @include b-s14-h16;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 21px;
    padding: 10px 16px;

    border-bottom: 1px solid rgba($green-500, 0.1);
  }
}

.layout__button{
  display: flex;
  justify-content: right;
}
.layout__address{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.cart {
  &-title {
    border-bottom: 1px solid rgba($green-500, 0.1);
    margin-bottom: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
  }
  &__additional {
    span {
      margin-right: 20px;
    }
  }
  &-container--row {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;

    &__right {
    }
  }
  &-form {
    display: flex;
    flex-direction: column;
    align-content: stretch;
    align-items: stretch;

    &__address,
    &__address-title,
    &__address-comment {
      padding-right: 20px;
    }

    &__address {
      .cart-form__input:first-child {
        width: 75%;
      }
    }

    &__footer {
      padding: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      justify-content: flex-end;
      margin: 20px 0;
    }
  }
  &-body {
    padding-right: 270px;
  }
}

.sheet {
  padding-top: 0;
  .input--big-label {
    width: 100%;
    padding-right: 20px;
  }
}
.button {
  padding: 10px 20px;
  @include b-s18-h21;
}
</style>
