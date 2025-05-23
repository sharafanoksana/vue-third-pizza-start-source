<template lang="pug">
transition(name="modal")
    .modal-overlay(v-if="show")
      .modal-container
        h3 {{ title }}
        form(@submit.prevent="save")
          .form-group(v-for="(field, index) in fields" :key="index")
            label(:for="field.key") {{ field.label }}
            input(
              v-if="field.type === 'text'",
              :id="field.key",
              v-model="formData[field.key]",
              :required="field.required"
            )
            input(
              v-if="field.type === 'number'",
              type="number",
              :id="field.key",
              v-model="formData[field.key]",
              :required="field.required"
            )
            input(
              v-else-if="field.type === 'date'",
              :id="field.key",
              type="date",
              v-model="formData[field.key]",
              :required="field.required"
            )
            input(
              v-else-if="field.type === 'boolean'",
              :id="field.key",
              type="checkbox",
              v-model="formData[field.key]"
            )
            select(
              v-else-if="field.type === 'select'",
              :id="field.key",
              v-model="formData[field.key]",
              :required="field.required"
            )
              option(v-for="option in field.options", :value="option.value") {{ option.label }}

          .actions
            button(type="submit") Сохранить
            button(@click="close", type="button") Отмена
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  fields: Array,
  item: Object,
  isEditing: Boolean
})

const emit = defineEmits(['close', 'save'])

const formData = ref({})

// При изменении item — обновляем форму
watch(() => props.item, (newItem) => {
  if (newItem) {
    const data = {}
    props.fields.forEach(field => {
      data[field.key] = newItem[field.key] ?? ''
    })
    formData.value = data
  }
}, { deep: true, immediate: true })

function save() {
  emit('save', formData.value)
}

function close() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}

input[type="text"],
input[type="date"],
select {
  width: 100%;
  padding: 6px;
  font-size: 14px;
}

input[type="checkbox"] {
  transform: scale(1.2);
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>