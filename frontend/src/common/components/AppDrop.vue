<template lang="pug">
div(
  @drop.stop="onDrop"
  @dragover.prevent
  @dragenter.prevent
)
</template>

<script setup>
import {DATA_TRANSFER_PAYLOAD} from "@/common/constants";

const emit = defineEmits(['drop'])

const onDrop = ({dataTransfer}) => {
  if(!dataTransfer) return

  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD)

  if(payload){
    const trancferData = dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
    const data = JSON.parse(trancferData)
    emit("drop", data)
  }
}
</script>

<style scoped lang="scss">

</style>