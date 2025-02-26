<template lang="pug">
div
  transition(name="fade" appear)
    app-popup
      app-popup-button
        router-link.close(
          :to="{name: `${redirectRouteName}`}"
        )
          spun.visually-hidden Закрыть поп-ап
      app-popup-title Спасибо за заказ
      p Мы начали готовить Ваш заказ, скоро привезем его вам ;)
      app-popup-button
        router-link.button(:to="{ name: `${redirectRouteName}` }") Отлично, я жду!
</template>

<script setup>
import AppPopup from "@/common/components/popup/AppPopup.vue";
import AppPopupButton from "@/common/components/popup/AppPopupButton.vue";
import AppPopupTitle from "@/common/components/popup/AppPopupTitle.vue";
import { useAuthStore } from "@/stores";
import { computed } from "vue";

const authStore = useAuthStore();

const redirectRouteName = computed(() =>
  authStore.isAuthenticated ? "orders" : "home",
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/app";
//@import "@/assets/scss/ds-system/ds";
//@import "@/assets/scss/mixins/mixins";
//@import "@/assets/scss/blocks/close";
//@import "@/assets/scss/visually-hidden";
//@import "@/assets/scss/blocks/button";
//@import "@/assets/scss/transitions";

</style>
