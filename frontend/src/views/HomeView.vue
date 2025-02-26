<template lang="pug">
main.content(v-if="dataStore.isDataLoaded")
  h1.content__wrapper.title--big Конструктор пиццы
  form.content__wrapper(
    :action="addToCart"
    method="post"
  )
    selector-dough(
      v-model="doughId"
    )
    selector-size(
      v-model="sizeId"
    )

    selector-ingredients(
      @checkSauce="checkSauceUpdate"
    )

    constructor-pizza(
      :dough-type="pizzaStore.dough?.value"
      :sauce-type="pizzaStore.sauce?.value"
      :selected-ingredients="pizzaStore.ingredients"
      @drop="pizzaStore.incrementIngredientQuantity"
    )

    .content__result
      p Итого: {{pizzaStore.price}} ₽
      button.button(
        type="button"
        :disabled="disableSubmit"
        @click="addToCart()"
      ) Готовьте!
      //      @drop="addIngredient"

  .container-flex__row
    demo-button(@click="show =!show") Показать
    br
    transition(name="bounce" )
      img(v-if="show" :src="getPublicImage('/public/img/product.svg')" alt="img")

    demo-button(@click="showJS =!showJS") Показать
    br
    transition(@enter="enterAnimation" @leave="leaveAnimation" css="false" )
      img(v-if="showJS" :src="getPublicImage('/public/img/product.svg')" alt="img")

  .container-flex__row
    button(
      @click="open = !open"
    ) Показать/скрыть
    transition
      p(v-if="open") Элемент

    button(
      @click="add"
    ) Add
    transition-group(name="card" tag="ul")
      li.card(v-for="({ id }) in items" :key="id") Id: {{ id }}
</template>

<script setup>
import SelectorDough from "@/modules/constructor/SelectorDough.vue";
import { computed, onMounted, reactive, ref } from "vue";
import SelectorSize from "@/modules/constructor/SelectorSize.vue";
import SelectorSauce from "@/modules/constructor/SelectorSauce.vue";
import SelectorIngredients from "@/modules/constructor/SelectorIngredients.vue";
import ConstructorPizza from "@/modules/constructor/ConstructorPizza.vue";
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";
import { useCartStore } from "@/stores/cart";
import router from "@/router";

/* -------- урок ---------*/
import DemoButton from "@/common/components/demo/DemoButton.vue";
import { getPublicImage } from "@/common/helpers/public-image";

const items = reactive([{ id: 1 }, { id: 2 }]);

function add() {
  items.push({ id: Math.floor(Math.random() * 10) });
}
const open = ref(false);
const show = ref(false);
const showJS = ref(false);
function clearAnimations(el, done) {
  el.addEventListener("animationend", () => {
    el.className = "";
    done();
  });
}

function enterAnimation(el, done) {
  el.className = "bounce";
  clearAnimations(el, done);
}

function leaveAnimation(el, done) {
  clearAnimations(el, done);
}
/* -------- конец ---------*/

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

const doughId = computed({
  get() {
    return pizzaStore.doughId || 1;
  },
  set(value) {
    pizzaStore.setDoughId(value);
  },
});
const sauceId = computed({
  get() {
    return pizzaStore.sauceId || 1;
  },
  set(value) {
    pizzaStore.setSauceId(value);
  },
});
const sizeId = computed({
  get() {
    return pizzaStore.sizeId || 1;
  },
  set(value) {
    pizzaStore.setSizeId(value);
  },
});

const disableSubmit = computed(() => {
  return !pizzaStore.name.length || pizzaStore.price === 0;
});
const getImage = (image) => {
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};

const checkSauceUpdate = (id) => {
  sauceId.value = +id;
};

//todo разобраться с добавлением ингредиентов с помощью drag/drop
const addIngredient = (ingredientId) => {
  pizzaStore.incrementIngredientQuantity(ingredientId);
};

const addToCart = () => {
  const cartStore = useCartStore();
  cartStore.savePizza(pizzaStore.$state);
  pizzaStore.$reset();

  pizzaStore.ingredients.forEach((el) => {
    el.count = 0;
    pizzaStore.deleteIngredient(el.ingredientId);
  });
  router.push("/cart");
};
const resetPizza = () => {
  pizzaStore.setName("");
  if (dataStore.isDataLoaded) {
    pizzaStore.setDoughId(dataStore.doughs[0].id);
    pizzaStore.setSizeId(dataStore.sizes[0].id);
    pizzaStore.setSauceId(dataStore.sauces[0].id);
  }
  pizzaStore.setIngredients([]);
  pizzaStore.setIndex(null);
};
onMounted(() => {
  resetPizza();
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

/* -------- урок ---------*/
.container-flex__row {
  display: flex;
  flex-direction: row;
}

.bounce {
  animation: bounce 0.5s;
  &-reverse {
    animation: bounce 0.5s reverse;
  }
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* -------- конец ---------*/
.content {
  margin-top: 62px;
}
.content__result {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
    z-index: 10;
  }
}
</style>
