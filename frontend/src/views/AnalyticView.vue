<template lang="pug">
main
    h1.title.title--big Аналитика
      .sheet
        h2.title.title--small.sheet__title Таблица учета ингридиенов
        .content__wrapper
          //DxDataGrid(
          //  :data-source="ingredients"
          //  :columns="columns"
          //  :show-borders="true"
          //  :column-auto-width="true"
          //  key-expr="id"
          //)
          //  DxEditing(
          //    :allow-updating="true"
          //    :allow-adding="true"
          //    :allow-deleting="true"
          //    mode="form"
          //    :use-icons="false"
          //    show-text="always"
          //  )
          //  DxPaging(
          //    :enabled="false"
          //  )
          //
          //  DxColumn(
          //    data-field="id"
          //    caption="id"
          //    :allow-editing="false"
          //  )
          //  DxColumn(
          //    data-field="name"
          //    caption="Название"
          //  )
          //  DxColumn(
          //    data-field="image"
          //    caption="Картинка"
          //    :width="50"
          //    cell-template="cellTemplate"
          //  )
          //  DxColumn(
          //    data-field="price"
          //    caption="Цена"
          //  )
          //  DxColumn(
          //    data-field="servingWeight"
          //    caption="Вес одной порции, г"
          //  )
          //  DxColumn(
          //    data-field="totalWeight"
          //    caption="Вес общий, г"
          //  )
          //  DxColumn(
          //    data-field="balance"
          //    caption="Остаток, г"
          //  )
          //
          //  template(#cellTemplate="{data}")
          //    img(:src="getPublicImage(data.value)" :alt="`Picture of ${data.value.split('/').at(-1).split('.')[0]}`")
          //
          //  DxToolbar
          //    DxItem(
          //      name="addRowButton"
          //      show-text="always"
          //      )
          //      DxButton(
          //        class="send"
          //        text="Добавить строку"
          //        icon="add"
          //        :width="120"
          //        type="success"
          //        styling-mode="contained"
          //      )



      .sheet
        .content__wrapper
          highcharts-chart(:options="chartOptions")

      //.sheet
      //  .content__wrapper
      //    simple-data-grid(
      //      :items="ingredients"
      //      @update:items="ingredients = $event"
      //    )

      .sheet
        data-table(
          v-model:data="ingredients"
          :columns="columns"
          :server-mode="true"
          :total-count="ingredients.length"
          :page-size-options="[5,10,15,20]"
          :loading="true",
          @update:current-page="ingredients"
        )

</template>

<script setup>
import { ref, onMounted } from "vue";
// import {
//   DxDataGrid,
//   DxColumn,
//   DxFormItem,
//   DxPaging,
//   DxEditing,
//   DxLookup,
//   DxButton,
//   DxToolbar,
//   DxItem,
// } from "devextreme-vue/data-grid";
// import "devextreme-vue/text-area";
// import "devextreme-vue/button";
import { getPublicImage } from "@/common/helpers/public-image";
import HighchartsChart from "@/modules/highcharts/HighchartsChart.vue";
import { useDataStore } from "@/stores";
import SimpleDataGrid from "@/components/SimpleDataGrid.vue";
import DataTable from "@/components/DataTable.vue";

const columns = ref([
  { label: "ID", key: "id", type: "number", required: true },
  { label: "Название", key: "name", type: "text", required: true },
  { label: "Изображение", key: "image", type: "text", required: true },
  { label: "Цена", key: "price", type: "number", required: true },
  { label: "Вес порции (г)", key: "servingWeight", type: "number",required: true,},
  { label: "Общий вес (г)", key: "totalWeight", type: "number", required: true },
  { label: "Остаток (г)", key: "balance", type: "number", required: true },
]);
const dataStore = useDataStore();

const ingredients = dataStore.ingredients;

const localeObj = {
  showing: 'Отображено',
  of: 'из',
  noRecords: 'Записей не найдено'
}
const chartOptions = {
  chart: {
    type: "bar",
  },
  title: {
    text: "График расхода ингридиентов",
  },
  xAxis: {
    categories: ingredients.map(({ name }) => name),
    gridLineWidth: 1,
    lineWidth: 1,
  },
  yAxis: {
    min: 0,
    title: {
      text: "г",
    },
    labels: {
      overflow: "justify",
    },
    gridLineWidth: 0,
  },
  tooltip: {
    valueSuffix: " г",
  },
  legend: {
    reversed: true,
  },
  plotOptions: {
    bar: {
      borderRadius: "50%",
      dataLabels: {
        enabled: true,
      },
      groupPadding: 0.01,
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: "Вес общий, г",
      data: ingredients.map(({ totalWeight }) => totalWeight),
      color: "#EBDCF7",
    },
    {
      name: "Вес одной порции",
      data: ingredients.map(({ servingWeight }) => servingWeight),
      color: "#FF842B",
    },
    {
      name: "Остатки, г",
      data: ingredients.map(({ balance }) => balance),
      color: "#48D618",
    },
  ],
};
// const closeDxLicense = () => {
//   document.body
//     .querySelector("dx-license")
//     .querySelector("svg")
//     .parentNode.click();
//
//   console.log("ingredients", ingredients);
// };
// onMounted(() => {
//   closeDxLicense();
// });
</script>

<style scoped lang="scss">
//@import "devextreme/dist/css/dx.light.css";
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/common";

.dx-icon.dx-icon-edit-button-addrow {
  content: "/U+002B" !important;
}

img {
  height: 30px;
  display: block;
}
</style>
