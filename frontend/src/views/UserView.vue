<template lang="pug">
.container
  sidebar-layout.sidebar
    template( #sidebar)
      router-link(
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'orders' }"
        :to="{ name: 'orders' }"
      ) История заказов
      router-link(
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'profile' }"
        :to="{ name: 'profile' }"
      ) Мои данные

  .layout__content
    router-view

</template>

<script setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const routeName = computed(() => {
  route.name;
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
}
.sidebar {
  position: fixed;
  z-index: 2;
  left: 8px;
  margin-top: 0px;
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba($green-500, 0.1);
  flex: none;
  padding-top: 88px;

  .router-link-active{
    color: rgba($black, 0.5);
  }
  .router-link-exact-active {
    background-color: rgba($green-500, 0.1);
  }
}

a {
  text-decoration: none;
}

.layout__link {
  @include b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: $black;

  &--active {
    background-color: rgba($green-500, 0.1);
  }

  &:hover {
    background-color: rgba($green-500, 0.2);
  }

  &:active {
    color: rgba($black, 0.5);
  }
}

.layout__content {
  padding-top: 82px;
  padding-right: 2.12%;
  padding-left: 200px;

  position: relative;
  width: 100%;
}

</style>
