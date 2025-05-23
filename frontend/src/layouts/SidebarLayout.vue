<template lang="pug">
.layout-default

  slot(name="sidebar")

  .layout__content
    slot
</template>

<script setup>

</script>

<style scoped lang="scss">
.layout-default {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
  flex-wrap: nowrap;
  margin-top: 82px;
}
</style>