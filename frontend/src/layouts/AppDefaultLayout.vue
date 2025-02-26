<template lang="pug">
.layout-default
  app-default-header
  slot
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import AppDefaultHeader from "@/layouts/AppDefaultHeader.vue";

</script>

<style scoped lang="scss">
.layout-default {
  height: 98vh;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
