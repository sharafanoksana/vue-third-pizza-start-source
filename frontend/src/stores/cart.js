import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useAuthStore } from "@/stores/auth";
import resources from "@/services/resources";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      id: null,
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),
  getters: {
    pizzasExtended: (state) => {
      const data = useDataStore();

      return state.pizzas.map((pizza) => {
        const pizzasIngredientsIds = pizza.ingredients.map((el) => {
          return el.ingredientId;
        });
        return {
          name: pizza.name,
          quantity: pizza.quantity,
          dough: data.doughs.find((el) => el.id === pizza.doughId),
          size: data.sizes.find((el) => el.id === pizza.sizeId),
          sauce: data.sauces.find((el) => el.id === pizza.sauceId),
          ingredients: data.ingredients.filter(
            (el) => pizzasIngredientsIds.includes(el.value),
          ),
          price: pizzaPrice(pizza),
        };
      });
    },
    miscExtended: (state) => {
      const data = useDataStore();

      return data.misc.map((misc) => {
        return {
          ...misc,
          quantity:
            state.misc.find((item) => item.miscId === misc.id)?.quantity ?? 0,
        };
      });
    },
    total: (state) => {
      const pizzaPrice = state.pizzasExtended
        .map((item) => item.quantity * item.price)
        .reduce((acc, val) => acc + val, 0);
      const miscPrice = state.miscExtended
        .map((item) => item.quantity * item.price)
        .reduce((acc, val) => acc + val, 0);
      return pizzaPrice + miscPrice;
    },

    pizzasExtendedPayload: (state) => {
      const data = useDataStore();

      return state.pizzas.map((pizza) => {
        const pizzasIngredientsIds = pizza.ingredients.map((el) => {
          return el.ingredientId;
        });
        return {
          name: pizza.name,
          quantity: pizza.quantity,
          doughId: data.doughs.find((el) => el.id === pizza.doughId).id,
          sizeId: data.sizes.find((el) => el.id === pizza.sizeId).id,
          sauceId: data.sauces.find((el) => el.id === pizza.sauceId).id,
          ingredients: data.ingredients
            .filter((el) => pizzasIngredientsIds.includes(el.value))
            .map((ingredient) => {
              return {
                ingredientId: ingredient.id,
                quantity: ingredient.count,
              };
            }),
        };
      });
    },
  },
  actions: {
    savePizza(pizza) {
      const { index, ...pizzaData } = pizza;
      if (index !== null) {
        this.pizzas[index] = {
          quantity: this.pizzas[index].quantity,
          ...pizzaData,
        };
      } else {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
        });
      }
    },
    setPizzaQuantity(index, count) {
      if (this.pizzas[index]) {
        this.pizzas[index].quantity = count;
      }
      if(count === 0){
        this.deletePizza(index)
      }
    },
    deletePizza (index){
      this.pizzas.splice(index,1)
    },
    setMiscQuantity(miscId, count) {
      const miscIdx = this.misc.findIndex((item) => item.miscId === miscId);

      // Добавляем ингредиент, если его нет, а количество больше 0
      // Если ингредиента нет, а количество 0 или меньше, то ничего не делаем
      if (miscIdx === -1 && count > 0) {
        this.misc.push({ miscId, quantity: 1 });
        return;
      } else if (miscIdx === -1) {
        return;
      }
      //Удаляем ингредиент, если количество 0
      if (count === 0) {
        this.misc.splice(miscIdx, 1);
        return;
      }
      this.misc[miscIdx].quantity = count;
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setAddress(address) {
      const { id, street, building, flat, comment } = address;
      this.address = { id, street, building, flat, comment };
    },
    setStreet(street) {
      this.address.street = street;
    },
    setBuilding(building) {
      this.address.building = building;
    },
    setFlat(flat) {
      this.address.flat = flat;
    },
    setComment(comment) {
      this.address.comment = comment;
    },
    setAddressId(addressId) {
      this.address.id = addressId;
    },

    async publishOrder() {
      const authStore = useAuthStore();
      return await resources.order.createOrder({
        userId: authStore.user?.id ?? null,
        phone: this.phone,
        address: this.address,
        pizzas: this.pizzasExtendedPayload,
        misc: this.misc,
      });
    },
    reset() {
      this.phone = "";
      this.address = {
        id: null,
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      this.pizzas = [];
      this.misc = [];
    },
    load(order) {
      this.phone = order.phone;
      this.pizzas =
        order?.orderPizzas?.map((pizza) => ({
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.quantity,
          ingredients: pizza.ingredients.map((ingredient) => ({
            ingredientId: ingredient.value,
            count: ingredient.quantity,
          })),
        })) ?? [];
      this.misc =
        order?.orderMisc?.map((misc) => ({
          miscId: misc.id,
          quantity: misc.quantity,
        })) ?? [];
    },
  },
});
