<template lang="pug">
main.order
  h1.title.title--big.order Итория заказов

  ul.order__list(v-for="(order, index) in profileStore.ordersExtended" :key="order.id")
    li.order__item.sheet
      .order__wrapper.sheet__title
        h1.title.title--small.order__number Заказ №{{index+1}}

        .order__sum
          b Сумма заказа: {{order.total}} ₽
        .order__button
          button.button.button--transparent.button--border(
            type="button"
            @click="profileStore.removeOrder(order.id)"
          ) Удалить
          button.button(
            type="button"
            @click="loadOrder(order)"
          ) Повторить

      .order__wrapper
        .order__additional
          ul.order__list
            li.order__item(
              v-for="pizza in order?.orderPizzas"
              :key="pizza.id"
            )
              .product
                img.product__img(
                  :src="getPublicImage('/public/img/product.svg')"
                  width='56'
                  height='56'
                  alt='пицца'
                )
                .product__text
                  h2.title.title--small {{pizza.name}}
                  ul
                    li {{ pizza.size?.name }}, {{ pizza.dough?.name }} тесто.
                    li Соус: {{pizza.sauce?.name}}.
                    li Начинка: {{ pizza.ingredients.map((i) => i?.name).join(", ") }}.
                .order__price {{pizza?.price}} ₽ × {{pizza?.quantity}}

        .order__additional
          ul.order__list(
              v-if="order.orderMisc"
            )
              li.order__item(
                v-for="misc in order.orderMisc"
                :key="misc.id"
              )
                .product
                  img.product__img(
                    :src="getPublicImage(misc.image??'')"
                    alt="Coca-Cola 0,5 литра"
                    width='40'
                    height='40'
                  )
                  .product__text
                    p
                      span {{misc.name}}&nbsp;×&nbsp;{{ misc.quantity }}
                      b {{misc.price}} ₽

      .order__address
        p {{ getAddress(order.orderAddress) }}
        p {{order?.orderAddress?.comment}}



</template>

<script setup>
import { getPublicImage } from "@/common/helpers/public-image";
import { useCartStore, useProfileStore } from "@/stores";
import router from "@/router";
const profileStore = useProfileStore();
const cartStore = useCartStore();
const loadOrder = (order) => {
  cartStore.load(order);
  router.push({ name: "cart" });
};
const getAddress = (address) => {
  return address?.name.includes("Самовынос")
    ? "Самовынос"
    : `ул.${address?.street}, д.${address?.building}${
        address?.flat ? ", кв." + address?.flat : "."
      }`;
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

@import "@/assets/scss/blocks/order";
@import "@/assets/scss/blocks/product";

.sheet {
  display: flex;
  flex-direction: column;
  padding-top: 0;

  &__title {
    display: flex;
    flex-direction: row;
  }
}
.order {
  &__additional {
    width: 50%;
  }
  &__list {
    width: 100%;
  }
  &__item {
    width: 90%;
  }
  &__sum {
    width: 350px;
  }
  &__price {
    margin-top: 0;
  }
}
</style>
