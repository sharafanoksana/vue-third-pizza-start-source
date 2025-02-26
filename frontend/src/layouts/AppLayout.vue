<template lang="pug">
component(
 :is="layout"
)
  slot
</template>

<script setup>
// import AppHeader from "@/layouts/AppDefaultHeader.vue";
import { useRoute } from "vue-router";
import { shallowRef, watch } from "vue";
import AppDefaultLayout from "@/layouts/AppDefaultLayout.vue";

const route = useRoute();
const layout = shallowRef(null);


watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta?.layout) {
        const component = await import(`../layouts/${meta.layout}.vue`);
        layout.value = component?.default || AppDefaultLayout;
      } else {
        layout.value = AppDefaultLayout;
      }
    } catch (e) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        e,
      );
      layout.value = AppDefaultLayout;
    }
  },
  { immediate: true, deep: true },
);
</script>

<style scoped lang="scss"></style>
