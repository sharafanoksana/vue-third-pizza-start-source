<template lang="pug">
.header
  .container
    .header__logo
      router-link.logo(
        :to="{name: 'home'}"
      )
        img.logo(
          src="/api/public/img/logo.svg"
          width="47"
          height="30"
          alt="V!U!E! Pizza"
        )
    .header__cart
      router-link(
        :to="{name: 'cart'}"
      ) {{cartStore.total}} ₽
    .header__user
      router-link(
        v-if="authStore.isAuthenticated"
        :to="{name: 'profile'}"
      )
        img(
          :src="getPublicImage(authStore.user.avatar)"
          :alt="authStore.user.name"
          width="32"
          height="32"
        )
        span {{authStore.user.name}}

      router-link.header__logout(
        v-if="authStore.isAuthenticated"
        :to="{name:'home'}"
        @click="logout"
      )
        span Выйти

      router-link.header__logout(
        v-else
        :to="{name:'login'}"
      )
        span Войти

</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useCartStore} from "@/stores/cart";
import {useAuthStore} from "@/stores";
import {getPublicImage} from "@/common/helpers/public-image";

const router = useRouter()
const isUser = ref(true)
const authStore = useAuthStore()
const logout = async () => {
  await authStore.logout()
  await router.replace({ name: "login" })
}


const cartStore = useCartStore()


// function getQuantityProduct () {
//   return cartStore.pizzasExtended.length || 0
//
// }
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds";

.header {


  display: block;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 3;

  .container{
    position: relative;

    display: flex;
    align-items: center;

    padding: 0 2.12%;

    background-color: $green-500;
    box-shadow: $shadow-light;
  }
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include b-s16-h19;

    display: block;

    padding: 21px 15px 21px 58px;

    transition: 0.3s;

    color: $white;
    background-color: $green-500;
    background-image: url("/api/public/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding: 14px 20px;

    transition: 0.3s;

    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: $white;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: "";
    vertical-align: middle;

    background: url("/api/public/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}

.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: "";
    vertical-align: middle;

    background: url("/api/public/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
