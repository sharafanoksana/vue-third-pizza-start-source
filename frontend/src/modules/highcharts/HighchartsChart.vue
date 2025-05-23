<template lang="pug">
.chart-container(
  ref="chartContainer"
)
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Highcharts from "highcharts";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

const chartContainer = ref(null);
let chart = null;

const initChart = () => {
  if (chart) {
    chart.destroy(); // удаляем предыдущий график, если есть
  }
  chart = Highcharts.chart(chartContainer.value, props.options);
};

// Инициализируем график при монтировании
onMounted(() => {
  initChart();
});
// Обновляем график при изменении опций
watch(
  () => props.options,
  (newOptions) => {
    if (newOptions && chart) {
      chart.update(newOptions);
    }
  },
);
</script>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 800px;
}
</style>
