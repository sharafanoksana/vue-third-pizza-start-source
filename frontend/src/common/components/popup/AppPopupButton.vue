<template lang="pug">
.popup__button
  slot
</template>

<script setup>

</script>

<style scoped lang="scss">
.popup__button {
  :deep(a) {
    padding: 16px 32px;
  }
}
</style>