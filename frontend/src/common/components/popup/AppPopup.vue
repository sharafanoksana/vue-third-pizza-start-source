<template lang="pug">
.popup
    slot
</template>

<script setup></script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds";
@import "@/assets/scss/mixins/mixins";

.popup {
  @include pf_center-all;


  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 430px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("/api/public/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("/api/public/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}
</style>
