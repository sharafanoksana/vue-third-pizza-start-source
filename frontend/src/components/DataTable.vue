<template lang="pug">
.data-table(role="table" aria-label="Таблица данных")
    span.sr-only Активно
    button.add-button(@click="openCreateModal" aria-label="Добавить новую запись")
      mi-tooltip(text="Добавить запись")
        template(#trigger)
          mi-icon(name="plus")
    .table-header(role="rowgroup")
      .row.header-row(role="row")
        .cell.header-cell(
          v-for="(column, index) in columns"
          :key="index"
          role="columnHeader"
          :aria-sort="getAriaSort(column.key)"
        )
          .column-header
            span {{ column.label }}
            .controls
              button.button--transparent-icon(@click="sortColumn(column.key)" aria-label="Сортировать по возрастанию/убыванию")
                span(v-if="sortConfig.direction === 'asc' && sortConfig.key === column.key")
                  mi-tooltip(text="Сортировать по возрастанию")
                    template(#trigger)
                      mi-icon(name="arrow-up" size="16" )
                span(v-else-if="sortConfig.direction === 'desc' && sortConfig.key === column.key")
                  mi-tooltip(text="Сортировать по убыванию")
                    template(#trigger)
                      mi-icon(name="arrow-down" size="16")
                span(v-else)
                  mi-tooltip(text="Сортировать")
                    template(#trigger)
                      mi-icon(name="arrow-up-down")

              input(
                type="text"
                placeholder="Фильтр"
                v-model="filters[column.key]"
                @input="applyFilters"
                :aria-label="`Фильтр по колонке ${column.label}`"
              )
        .cell.header-cell

    .table-body(role="rowgroup")
      .row.body-row(v-for="(row, rowIndex) in paginatedData" :key="rowIndex" role="row")
        .cell.body-cell(v-for="(column, colIndex) in columns" :key="colIndex" role="cell")
          template(v-if="column.type === 'boolean'")
            input(
              type="checkbox"
              v-model="row[column.key]"
              disabled
              :aria-label="`${row[column.key] ? 'Активно' : 'Не активно'}: ${column.label}`"
            )
          template(v-else)
            | {{ row[column.key] }}

        .cell.body-cell.actions(role="cell")
          button.button--transparent-icon(@click="openEditModal(row)" aria-label="Редактировать запись")
            mi-tooltip(text="Редактировать")
              template(#trigger)
                mi-icon(name="edit" tooltip="Редактировать запись")
          button.button--transparent-icon(@click="deleteRow(rowIndex)" aria-label="Удалить запись")
            mi-tooltip(text="Удалить")
              template(#trigger)
                mi-icon(name="delete" tooltip="Удалить запись")

    .pagination-wrapper(aria-live="polite")
      pagination-table(
        v-model:current-page="currentPage"
        v-model:page-size="rowsPerPage"
        :total="totalItems"
        :page-size-options="pageSizeOptions"
        :locale="{showing: 'Показано', of: 'из', noRecords: 'Записей не найдено'}"
      )

    EditModal(
      v-model:show="showModal"
      :fields="columns"
      :item="currentRow"
      :is-editing="isEditing"
      @save="handleSave"
      @close="closeModal"
      aria-labelledby="modal-title"
    )

</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import EditModal from "./EditModal.vue";
import PaginationTable from "@/components/Pagination.vue";
import MiIcon from "@/components/MiIcon.vue";
import MiTooltip from "@/components/MiTooltip.vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  pageSizeOptions: {
    type: Array,
    default: () => [5, 10, 20],
  },
  locale: {
    type: Object,
    default: () => ({
      showing: "Показано",
      of: "из",
    }),
  },
  serverMode: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  totalCount: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:data"]);

// --- State ---
const showModal = ref(false);
const isEditing = ref(false);
const currentRow = ref({});
const currentPage = ref(1);
const filters = ref({});
const sortConfig = ref({ key: null, direction: "asc" });
const rowsPerPage = ref(5);
const activeSortColumn = ref(0);
const gotoPageInput = ref("");

// --- Computed ---
const filteredData = computed(() => {
  return props.data.filter((item) => {
    return props.columns.every((col) => {
      const value = String(item[col.key]).toLowerCase();
      const filter = String(filters.value[col.key] || "").toLowerCase();
      return value.includes(filter);
    });
  });
});

const sortedData = computed(() => {
  const data = [...filteredData.value];
  if (!sortConfig.value.key) return data;

  const { key, direction } = sortConfig.value;
  return data.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return sortedData.value.slice(start, end);
});

const totalItems = computed(() => {
  return props.serverMode ? props.totalCount : sortedData.value.length;
});

function onPageSizeChange() {
  currentPage.value = 1;
}

const endOfData = computed(() => {
  return (
    paginatedData.value.length < rowsPerPage.value ||
    currentPage.value * rowsPerPage.value >= sortedData.value.length
  );
});

const rangeLabel = computed(() => {
  const total = sortedData.value.length;
  if (total === 0) return props.locale.noRecords || "Нет записей";

  const start = (currentPage.value - 1) * rowsPerPage.value + 1;
  const end = Math.min(currentPage.value * rowsPerPage.value, total);

  return `${props.locale.showing} ${start}–${end} ${props.locale.of} ${total}`;
});

// --- Methods ---
function sortColumn(key) {
  const direction =
    sortConfig.value.key === key && sortConfig.value.direction === "asc"
      ? "desc"
      : "asc";
  sortConfig.value = { key, direction };
}

function applyFilters() {
  currentPage.value = 1;
}

function openCreateModal() {
  currentRow.value = {};
  isEditing.value = false;
  showModal.value = true;
}

function openEditModal(row) {
  currentRow.value = JSON.parse(JSON.stringify(row));
  isEditing.value = true;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function handleSave(formData) {
  if (isEditing.value) {
    const newData = props.data.map((item) =>
      item.id === currentRow.value.id ? { ...item, ...formData } : item,
    );
    emit("update:data", newData);
  } else {
    const newId = props.data.length
      ? Math.max(...props.data.map((d) => d.id)) + 1
      : 1;
    emit("update:data", [...props.data, { id: newId, ...formData }]);
  }
  closeModal();
}

function deleteRow(index) {
  const newData = props.data.filter((_, i) => i !== index);
  emit("update:data", newData);
}

const getAriaSort = (key) => {
  if (sortConfig.value.key !== key) return "none";
  return sortConfig.value.direction === "asc" ? "ascending" : "descending";
};
function nextPage() {
  currentPage.value++;
}

function prevPage() {
  currentPage.value--;
}

function gotoPage() {
  const pageNum = parseInt(gotoPageInput.value);
  if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages.value) {
    currentPage.value = pageNum;
    gotoPageInput.value = "";
  }
}

//Вычислим общее количество страниц
const totalPages = computed(() => {
  return Math.ceil(sortedData.value.length / rowsPerPage.value) || 1;
});
// --- Keyboard Navigation ---
function handleKeyDown(e) {
  const keys = {
    ArrowLeft: -1,
    ArrowRight: 1,
  };

  if (!keys[e.key]) return;

  e.preventDefault();

  const colKeys = props.columns.map((c) => c.key);
  const currentIndex = activeSortColumn.value
    ? colKeys.indexOf(activeSortColumn.value)
    : 0;

  let newIndex = currentIndex + keys[e.key];
  if (newIndex < 0) newIndex = colKeys.length - 1;
  if (newIndex >= colKeys.length) newIndex = 0;

  activeSortColumn.value = colKeys[newIndex];
  sortColumn(colKeys[newIndex]);
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";
@import "@/assets/scss/blocks/table";
@import "@/assets/scss/blocks/button";

.data-table {
  @include r-s16-h19;
  font-family: sans-serif;
  width: 100%;
  overflow-x: auto;
}

/* Flex-таблица */
.table-header,
.table-body {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.table-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f5f5f5;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}
.button--transparent-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.row {
  display: flex;
  width: 100%;
  min-height: auto; /* авто высота */
  padding: 4px 0;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.header-row {
  background-color: #f5f5f5;
  font-weight: bold;
}

.cell {
  white-space: normal; /* разрешаем перенос текста */
  overflow: visible;
  text-overflow: clip;
}

/* Распределение ширины по всем столбцам */
.cell,
.header-cell {
  flex: 1;
  min-width: 120px;
  width: fit-content;
}

/* Заголовки */
.header-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 6px;
  &.active {
    background-color: #e0e0e0;
    font-weight: bold;
  }
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.controls input {
  width: 80px;
  padding: 2px;
  font-size: 12px;
}

/* Ячейки тела — выравнивание по правому краю */
.body-cell {
  text-align: right;
  padding-right: 10px;
}

/* Кнопки в последнем столбце */
.body-cell.actions {
  display: flex;
  flex-direction: row;
  text-align: center;
  min-width: 120px;
  flex: 0 0 auto;
}

.add-button {
  margin-top: 16px;
  padding: 8px 12px;
  cursor: pointer;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.data-table {
  color: var(--text-color);
}

.table-header {
  background-color: var(--table-header-bg);
}

.cell {
  border-bottom: var(--table-border);
}
</style>
