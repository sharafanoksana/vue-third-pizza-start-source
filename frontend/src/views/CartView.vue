<template lang="pug">
form.layout-form(
    action="#"
    method="post"
  )
    main.content.cart
      .container
        .cart__title
          h1.title.title--big Корзина
        .sheet.cart__empty(
          v-if="cartStore.pizzasExtended.length === 0"
        )
          p В корзине нет ни одного товара

        ul.cart-list.sheet(
          v-else
          v-for="(pizza, index) in cartStore.pizzasExtended" :key="index"
        )
          li.cart-list__item(v-if="pizza.quantity > 0" )
            .product.cart-list__product
              img.product__img(
                :src="getPublicImage('/public/img/product.svg')"
                width="56"
                height="56"
                alt="Капричоза"
              )
              .product__text
                h2 {{pizza.name}}
                ul
                  li {{pizza.size.name}}, на {{pizza.dough.name.toLowerCase().replace('е','м')}} тесте
                  li Соус: {{pizza.sauce.name.toLowerCase()}}
                  li Начинка: {{getIngredients(pizza.ingredients)}}
            app-counter.cart-list__counter(
              :value="pizza.quantity"
              accent
              @input="addPizza(index, $event)"
            )
            .cart-list__price
              b {{pizza.price * pizza.quantity }} ₽
            .cart-list__button
              button.cart-list__edit.button.button--transparent(
                type="button"
                @click="editPizza(index)"
              ) Изменить

        .cart__additional
          ul.additional-list(v-for="misc in dataStore.misc" :key="misc.id" )
            li.additional-list__item.sheet
              .additional.cart-list__additional
                img.product__img(
                  :src="getPublicImage(misc.image)"
                  width="56"
                  height="56"
                  :alt="misc.name"
                )
                .additional__text
                  h3 {{misc.name}}

              .container-row
                .additional-list__counter
                  app-counter(
                    :value="misc.quantity"
                    accent
                    @input="cartStore.setMiscQuantity(misc.id, $event)"
                  )
                .additional-list__price
                  b &#215 {{misc.price}} ₽

        .cart__form
          .cart-form
            label.cart-form__select.input.input--big-label
              span Получение заказа
              select.select(
                name="test"
                @input="deliveryOption = $event.target.value"
              )
                //option(value="self") Заберу сам
                option(
                  v-if="authStore.isAuthenticated"
                  v-for="(address, index) in profileStore.addresses"
                  :key='address.id'
                  :value="'home'+index"
                  ) {{address.name}}
                option(value="new") Новый адрес

            label.cart-form__input.input.input--big-label
              span Контактный телефон:
              input.input(
                name="phone"
                type="tel"
                v-model="phone"
                placeholder="+7 999 999-99-99"
                :readonly="authStore.isAuthenticated "
              )

          .cart-form__address(v-if="deliveryOption !== 'self'" )
            .input.input--big-label
              span {{deliveryOption === 'new' ? 'Новый адрес:' : 'Адресс'}}
              label.cart-form__input.cart-form__input--big Улица *
                input.input(
                  name="street"
                  type="text"
                  v-model="street"
                  required
                  :readonly="authStore.isAuthenticated && deliveryOption !== 'new'"
                )
              label.cart-form__input Дом *
                input.input(
                  name="house"
                  type="text"
                  v-model="building"
                  :readonly="authStore.isAuthenticated && deliveryOption !== 'new'"
                )
              label.cart-form__input Квартира
                input.input(
                  name="apartment"
                  type="text"
                  v-model="flat"
                  required
                  :readonly="authStore.isAuthenticated && deliveryOption !== 'new'"
                )

            label.cart-form__input.input.input--big-label
                span Комментарий:
                input.input(
                  name="comment"
                  type="test"
                  v-model="comment"
                )

.footer
    .footer__more
      router-link.button.button--arrow.button--border(
        :to="{ name: 'home' }"
      ) Хочу еще одну
    .footer__text
      span Перейти к конструктору <br /> чтоб собрать еще одну пиццу

    .footer__price
      b Итого:  {{cartStore.total}} ₽
    .footer__submit
      button.button(
        type='submit'
        @click="submit"
        :disabled="cartStore.total === 0"
      ) Оформить заказ

</template>

<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";
import { useProfileStore } from "@/stores/profile";
import { useRoute, useRouter } from "vue-router";
import AppPopup from "@/common/components/popup/AppPopup.vue";
import AppPopupTitle from "@/common/components/popup/AppPopupTitle.vue";
import AppPopupButton from "@/common/components/popup/AppPopupButton.vue";
import { getPublicImage } from "@/common/helpers/public-image";
import { useAuthStore } from "@/stores";
import resources from "@/services/resources";

const cartStore = useCartStore();
const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const router = useRouter();

const deliveryOption = ref("self");
// const indexAddress = ref(0);
// const isOpenPopup = ref(false);

const indexAddress = computed(() =>
    deliveryOption.value === 'self'
        ? profileStore?.addresses.findIndex(({street})=>street==='self')
        : +deliveryOption.value.replace("home", ""),
);
const curentAddress = computed(() =>
    deliveryOption.value === 'self'
        ? profileStore?.addresses.find(({street})=>street==='self')
        : profileStore?.addresses[+deliveryOption.value.replace("home", "")],
);
const getCountIngredientStr = (count) => {
  return count > 1 ? `\u00D7 ${count}` : "";
};
const getIngredients = (arr) => {
  let list = "";
  arr.forEach(({ name, count }) => {
    list += `, ${name.toLowerCase()} ${getCountIngredientStr(count)}`;
  });
  return list.slice(1);
};

const phone = computed({
  get() {
    if (authStore.isAuthenticated) {
      cartStore.setPhone(authStore.user.phone);
    }
    return cartStore.phone;
  },
  set(value) {
    cartStore.setPhone(value);
  },
});
const comment = computed({
  get() {
    return cartStore.address.comment;
  },
  set(value) {
    cartStore.setComment(value);
  },
});

const street = computed({
  get() {
    if (authStore.isAuthenticated && deliveryOption.value !== "new") {
      cartStore.setStreet(curentAddress.value.street);
    }
    return cartStore.address.street;
  },
  set(value) {
    cartStore.setStreet(value);
  },
});

const building = computed({
  get() {
    if (authStore.isAuthenticated && deliveryOption.value !== "new") {
      cartStore.setBuilding(curentAddress.value.building);
    }
    return cartStore.address.building;
  },
  set(value) {
    cartStore.setBuilding(value);
  },
});

const flat = computed({
  get() {
    if (authStore.isAuthenticated && deliveryOption.value !== "new") {
      cartStore.setFlat(curentAddress.value.flat);
    }
    return cartStore.address.flat;
  },
  set(value) {
    cartStore.setFlat(value);
  },
});
const addPizza = (index, val) => {
  cartStore.setPizzaQuantity(index, val);
};
const editPizza = async (index) => {
  pizzaStore.loadPizza({
    index,
    ...cartStore.pizzas[index],
  });
  await router.push({ name: "home" });
};

const submit = async () => {
  if (deliveryOption.value === 'self' || deliveryOption.value.includes("home")) {
    profileStore.addresses[indexAddress.value].comment = comment.value;
    cartStore.address.id = profileStore?.addresses[indexAddress.value]?.id
  } else {
    cartStore.setAddress({
      street: street.value,
      building: building.value,
      flat: flat.value,
      comment: comment.value ?? "",
    });
  }
  const res = await cartStore.publishOrder();
  if (res.__state === "success") {
    authStore.isAuthenticated && (await profileStore.loadOrders());
    await router.push({ name: "success" });
    cartStore.reset();
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/blocks/select.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/cart.scss";
@import "@/assets/scss/blocks/cart-form.scss";
@import "@/assets/scss/blocks/input.scss";
@import "@/assets/scss/blocks/footer.scss";

//@import "@/assets/scss/blocks/cart-list.scss";

ul {
  list-style-type: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  margin-top: 82px;
}

.cart {
  width: 900px;

  &-list__item {
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
    justify-content: space-between;

    &:not(:first-child) {
      border-top: 1px solid rgba($green-500, 0.1);
    }
  }

  &-list__product {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    ul {
      margin-block-end: 0;
      width: 500px;
    }

    h2 {
      margin: 0;
      margin-top: -8px;
    }
  }

  &-list__counter {
    align-items: flex-start;
  }

  &__additional {
    display: flex;
    width: 100%;
    gap: 20px;
    flex-direction: row;
  }

  &-form__select {
    margin-bottom: 20px;
  }
  &-form__address {
    display: flex;
    flex-direction: column;
    .input--big-label {
      width: 100%;
      margin-left: 0;
      .cart-form__input--big {
        width: 120%;
      }
    }
  }
}

.sheet {
  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.additional {
  padding-bottom: 15px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.additional-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;

  &__item {
    padding: 20px;
    flex-grow: 1;

    .container-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid rgba($green-500, 0.1);
      box-sizing: border-box;
      width: 100%;
      margin-top: auto;
      padding: 18px 15px 0;
    }
  }

  &__price {
    @include b-s16-h19;
  }
}

a {
  text-decoration: none;
}
</style>
