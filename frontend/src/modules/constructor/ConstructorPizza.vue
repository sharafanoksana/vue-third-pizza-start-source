<template lang="pug">
.content__pizza
  label.input
    span.visually-hidden Название пиццы
    input(
      type="text"
      name="pizza_name"
      :value="name"
      placeholder="Введите название пиццы"
      @input="pizzaStore.setName($event.target.value) "
    )
    
  .content__constructor
    //@drop="emit('drop', $event.value)"
    app-drop(
      @drop="pizzaStore.incrementIngredientQuantity($event)"
    )

      .pizza(:class="`pizza--foundation--${doughType}-${sauceType}`")
        .pizza__wrapper
          transition-group(name="scale")
            .pizza__filling(
              v-for="ingredient in selectedIngredients"
              :key="ingredient.ingredientId"
              :class="getClass(ingredient)"
            )

</template>

<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import { computed } from "vue";
import { usePizzaStore } from "@/stores/pizza";
import { useCartStore } from "@/stores/cart";
import { enterAnimation, leaveAnimation } from "@/common/helpers/animation";

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;

const pizzaStore = usePizzaStore();

const name = computed({
  get() {
    return pizzaStore.name;
  },
  set(value) {
    pizzaStore.setName(value);
  },
});

const props = defineProps({
  doughType: {
    type: Number,
    required: true,
  },
  sizeType: {
    type: Number,
    required: true,
  },
  sauceType: {
    type: String,
    required: true,
  },
  selectedIngredients: {
    type: Array,
    required: true,
  },
});

// const emit = defineEmits(['drop'])
const getClass = (ingredient) => {
  const two =
    ingredient.count === TWO_INGREDIENTS ? "pizza__filling--second" : "";
  const third =
    ingredient.count === THREE_INGREDIENTS ? "pizza__filling--third" : "";
  return [`pizza__filling--${ingredient.ingredientId}`, two, third];
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";
@import "@/assets/scss/blocks/title.scss";
@import "@/assets/scss/blocks/input.scss";
@import "@/assets/scss/transitions";

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  display: flex;
  width: 315px;
  height: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: $green-100;
  box-shadow:
    0 0 20px 10px $silver-200,
    0 0 20px 5px $green-100;

  & div {
    width: 315px;
    height: 315px;
  }
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url("/api/public/img/foundation/big-creamy.svg");
  }

  &--foundation--large-tomato {
    background-image: url("/api/public/img/foundation/big-tomato.svg");
  }

  &--foundation--light-creamy {
    background-image: url("/api/public/img/foundation/small-creamy.svg");
  }

  &--foundation--light-tomato {
    background-image: url("/api/public/img/foundation/small-tomato.svg");
  }

  &.diameter {
    display: flex;
    &--small {
      width: 245px;
      height: 245px;
    }

    &--normal {
      width: 280px;
      height: 280px;
    }

    &--big {
      width: 315px;
      height: 315px;
    }
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  $bl: &;
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: "";

    background-image: inherit;
  }

  &--second {
    &::before {
      display: block;

      transform: rotate(45deg);
    }
  }

  &--third {
    &::before {
      display: block;

      transform: rotate(45deg);
    }

    &::after {
      display: block;

      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/ananas.svg");
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/bacon.svg");
  }

  &--blue_cheese,
  &--blue.pizza__filling--second::before,
  &--blue.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/blue_cheese.svg");
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/cheddar.svg");
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/chile.svg");
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/ham.svg");
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/jalapeno.svg");
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/mozzarella.svg");
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/mushrooms.svg");
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/olives.svg");
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/onion.svg");
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/parmesan.svg");
  }

  &--salami,
  &---salami.pizza__filling--second::before,
  &---salami.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/salami.svg");
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/salmon.svg");
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/tomatoes.svg");
  }
}
</style>
