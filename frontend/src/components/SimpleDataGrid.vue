<template>
  <div class="crud-table">
    <!-- Форма добавления -->
    <div v-if="showAddForm" class="form">
      <input v-model.number="newRow.id" placeholder="ID" type="number" />
      <input v-model="newRow.name" placeholder="Имя" />
      <input v-model.number="newRow.age" placeholder="Возраст" type="number" />
      <button @click="addRow">Добавить</button>
      <button @click="showAddForm = false">Отмена</button>
    </div>

    <button v-if="!showAddForm" @click="showAddForm = true">+ Добавить строку</button>

    <!-- Таблица -->
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Имя</th>
        <th>Стоимость</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in paginatedData" :key="row.id">
        <td>{{ row.id }}</td>
        <td>
          <input v-if="editingId === row.id" v-model="row.name" />
          <span v-else>{{ row.name }}</span>
        </td>
        <td>
          <input v-if="editingId === row.id" v-model.number="row.age" type="number" />
          <span v-else>{{ row.price }}</span>
        </td>
        <td>
          <button v-if="editingId === row.id" @click="saveRow(row)">Сохранить</button>
          <button v-else @click="editRow(row)">Редактировать</button>
          <button @click="deleteRow(row.id)">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Пагинация -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Вперёд</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginatedCrudTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: [...this.items],
      showAddForm: false,
      newRow: {
        id: null,
        name: '',
        price: null
      },
      editingId: null,
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    }
  },
  methods: {
    addRow() {
      if (!this.validateRow(this.newRow)) {
        alert('Заполните все поля');
        return;
      }

      // Проверяем уникальность ID
      const exists = this.data.some(row => row.id === this.newRow.id);
      if (exists) {
        alert('ID должен быть уникальным');
        return;
      }

      this.data.push({ ...this.newRow });
      this.showAddForm = false;
      this.newRow = { id: null, name: '', age: null };
      this.$emit('update:items', [...this.data]);
    },
    editRow(row) {
      this.editingId = row.id;
    },
    saveRow(row) {
      this.editingId = null;
      this.$emit('update:items', [...this.data]);
    },
    deleteRow(id) {
      this.data = this.data.filter(row => row.id !== id);
      this.$emit('update:items', [...this.data]);

      if (this.currentPage > this.totalPages) {
        this.currentPage = Math.max(1, this.totalPages);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    validateRow(row) {
      return row.id && row.name && row.age;
    }
  }
};
</script>

<style scoped>
.crud-table table {
  width: 100%;
  border-collapse: collapse;
}
.crud-table th, .crud-table td {
  border: 1px solid #ccc;
  padding: 8px;
}
.crud-table input {
  width: 100%;
  box-sizing: border-box;
}
.pagination {
  margin-top: 10px;
}
.pagination button {
  margin: 0 5px;
}
</style>