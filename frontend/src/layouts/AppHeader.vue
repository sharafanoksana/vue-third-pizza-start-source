<template lang="pug">
.header
  .header__logo
    img.logo(
      src="@/assets/img/logo.svg"
      width="47"
      height="30"
      alt="V!U!E! Pizza"
    )
  .header__cart
    a(
      href="/"
    ) 0
  .header__user
    a(
      href="/"
    )
      picture
        source(
          type="image/webp"
          srcset="@/assets/img/users/user5.webp 1x, @/assets/img/users/user5@2x.webp 2x"
        )
        img(
          src="@/assets/img/users/user5.jpg"
          srcset="@/assets/img/users/user5@2x.jpg"
          alt="Василий Ложкин"
          width="32"
          height="32"
        )
      span Василий Ложкин
    a.header__logout(
      href="/"
    )
      span Выйти
</template>

<script setup></script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds";

.header {
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;

  padding: 0 2.12%;

  background-color: $green-500;
  box-shadow: $shadow-light;
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
    background-image: url("@/assets/img/cart.svg");
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

    background: url("@/assets/img/login.svg") no-repeat center;
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

    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
