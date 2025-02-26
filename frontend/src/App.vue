<template lang="pug">
app-layout
  router-view(v-if="isLoaded")
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import {useAuthStore, useDataStore} from "@/stores";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import JwtService from "@/services/jwt/jwt.service";
import router from "@/router";

const dataStore = useDataStore()
const route = useRoute()
const isLoaded = ref(false)

const checkLoggedIn = async () => {
  const authStore = useAuthStore()
  const token = JwtService.getToken()
  if(!token){
    isLoaded.value = true
    return
  }
  try{
    await authStore.whoAmI()
    const {redirect} = route.query
    router.push( redirect ? redirect : {name: "home"})
  } catch (e) {
    JwtService.destroyToken()
    console.error(e)
  } finally {
    isLoaded.value = true
  }
}

onMounted(() => {
  checkLoggedIn()
  dataStore.loadData()
})
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
body {
  justify-content: center;
  align-items: center;
}
.main__wrapper {
  padding-bottom: 30px;

  background-color: $white;
  box-shadow: $shadow-light;

  h1 {
    margin-bottom: 0;
    padding: 0 95px;

    text-align: center;

    @include b-s36-h42;
  }

  p {
    padding: 0 95px;

    text-align: center;

    font-size: 20px;
    line-height: 30px;
  }

  b {
    font-size: 1.2em;
  }
}

.main__header {
  margin-bottom: 30px;
  padding: 20px 0;

  background-color: $green-600;

  img {
    display: block;

    margin: 0 auto;
  }
}

</style>
