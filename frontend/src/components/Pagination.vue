<template lang="pug">
.pagination
    .range-label {{ rangeLabel }}
    .page-size-select(v-if="showPageSize")
      label(for="page-size") Показывать по:
      select#page-size(v-model.number="localPageSize" @change="onPageSizeChange")
        option(v-for="size in pageSizeOptions" :value="size") {{ size }}
    button(:disabled="currentPage === 1" @click="prevPage") Назад
    .goto-page(v-if="showGoto")
      input(
        type="number"
        v-model.number="gotoPageInput"
        placeholder="Стр."
        min="1"
        :max="totalPages"
        @keyup.enter="gotoPage"
      )
      button(@click="gotoPage") Перейти
    span Страница {{ currentPage }} из {{ totalPages }}
    button(:disabled="endOfData" @click="nextPage") Вперёд
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  pageSizeOptions: {
    type: Array,
    default: () => [5, 10, 20]
  },
  showPageSize: {
    type: Boolean,
    default: true
  },
  showGoto: {
    type: Boolean,
    default: true
  },
  locale: {
    type: Object,
    default: () => ({
      showing: 'Показано',
      of: 'из'
    })
  }
})

const emit = defineEmits(['update:current-page', 'update:page-size'])

const localPageSize = ref(props.pageSize)
const gotoPageInput = ref('')

const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize) || 1
})

const endOfData = computed(() => {
  return props.currentPage * props.pageSize >= props.total
})

const rangeLabel = computed(() => {
  if (props.total === 0) return props.locale.noRecords || 'Нет записей'

  const start = (props.currentPage - 1) * props.pageSize + 1
  const end = Math.min(props.currentPage * props.pageSize, props.total)

  return `${props.locale.showing} ${start}–${end} ${props.locale.of} ${props.total}`
})

function prevPage() {
  emit('update:current-page', props.currentPage - 1)
}

function nextPage() {
  emit('update:current-page', props.currentPage + 1)
}

function onPageSizeChange() {
  emit('update:page-size', localPageSize.value)
  emit('update:current-page', 1)
}

function gotoPage() {
  const pageNum = parseInt(gotoPageInput.value)
  if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages.value) {
    emit('update:current-page', pageNum)
    gotoPageInput.value = ''
  }
}
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: sans-serif;
  font-size: var(--pagination-font-size, 14px);
  color: var(--pagination-color, #333);
}

.range-label {
  font-size: var(--pagination-range-font-size, 14px);
  margin-right: auto;
}

.page-size-select {
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-size-select label {
  font-weight: var(--pagination-label-weight, normal);
}

.page-size-select select {
  padding: 4px 8px;
  border-radius: var(--pagination-border-radius, 4px);
  border: var(--pagination-border, 1px solid #ccc);
}

.goto-page {
  display: flex;
  align-items: center;
  gap: 4px;
}

.goto-page input {
  width: 60px;
  padding: 4px;
  border-radius: var(--pagination-input-border-radius, 4px);
  border: var(--pagination-input-border, 1px solid #ccc);
}
</style>