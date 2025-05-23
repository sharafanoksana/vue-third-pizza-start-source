<template lang="pug">
span.tooltip-wrapper
  slot(name="trigger")
  span.tooltip-text {{ text }}
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.tooltip {
  &-wrapper {
    position: relative;
    display: inline-block;
    cursor: help;


    &:hover .tooltip-text {
      visibility: visible;
      opacity: 1;

    }
  }

  &-text {
    visibility: hidden;
    width: max-content;
    background: #333;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 4px 8px;
    position: absolute;
    z-index: 100;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
    font-size: 12px;
  }
}
</style>