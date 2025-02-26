<template lang="pug">
div(
  @drop.stop="onDrop"
  @dragover.prevent
  @dragenter.prevent
)
  slot
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

const emit = defineEmits(["drop"]);

const onDrop = ({ dataTransfer }) => {

  if (!dataTransfer) return;
  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (payload) {
    const transferData = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
    const data = JSON.parse(transferData);
    data.count += 1;
    emit("drop", data);
  }
};
</script>

<style scoped lang="scss"></style>
