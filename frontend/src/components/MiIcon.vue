<template>
  <span class="icon-wrapper" :title="tooltip">
    <svg fill="none" viewBox="0 0 24 24" :width="size" :height="size" :class="{ 'icon-hover': hover }" stroke-width="1.5" stroke="currentColor">
      <!-- Редактировать -->
      <path v-if="name === 'edit'" fill="none" stroke="green" stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>

      <!-- Удалить -->
      <path v-if="name === 'delete'" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />

      <!-- Сортировка вверх -->
      <path v-if="name === 'arrow-up'" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />-->

      <!-- Сортировка вниз -->
      <path v-if="name === 'arrow-down'" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />

      <!-- Сортировка вверх вниз -->
      <path v-if="name === 'arrow-up-down'" fill="currentColor"  stroke-linecap="round" stroke-linejoin="round"  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />

      <!-- Поиск -->
      <path v-if="name === 'search'" stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />

      <!-- Плюс (добавить) -->
      <path v-if="name === 'plus'" stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />

      <!-- Загрузка -->
      <path v-if="name === 'spinner'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>

      <path v-if="name === 'x-mark'" stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />


    </svg>
  </span>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
    validator: value => ['edit', 'delete', 'arrow-up', 'arrow-down', 'arrow-up-down', 'plus', 'spinner', 'search'].includes(value)
  },
  size: {
    type: [String, Number],
    default: 20
  },
  tooltip: {
    type: String,
    default: null
  },
  hover: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/table";
.icon-wrapper {
  display: inline-block;
  cursor: pointer;
  color: var(--icon-color);
  transition: color 0.2s ease;

  &:hover {
    color: var(--icon-hover-color);
  }
  svg {
    vertical-align: middle;
  }
}


</style>