<template lang="pug">
main.content
  .login-card(
    tabindex="0"
    ref="dialog"
  )
    .login-card__header
      button.close.login-card__close.close--white(
        type="button"
        @click="closeDialog"
      )

    section.login-card__wrapper
      h1.login-card__name.login-card__name--min Авторизируйтесь на сайте
      form.login-card__block(
        @submit.prevent="login"
        method="post"
      )
        .login-card__row
          label.input
            span E-mail
            input(
              v-model="email"
              type="email"
              name="email"
              placeholder="example@mail.ru"
              )
            .sign-form__input-error {{validations.email.error }}

        .login-card__row
          label.input
            span Пароль
            input(
              v-model="password"
              type="password"
              name="password"
              placeholder="***********"
            )
            .sign-form__input-error {{validations.password.error }}

        .login-card__row
          .server-error {{errorMessage}}

      button.button(type='submit' @click.prevent="login") Авторизоваться

</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "@/stores";
import { clearValidationErrors, validateFields } from "@/common/validator";

const router = useRouter();
const dialog = ref(null);
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const resetValidations = () => {
  return {
    email: {
      error: "",
      rules: ["required", "email"],
    },
    password: {
      error: "",
      rules: ["required"],
    },
  };
};
const validations = ref(resetValidations());

const watchField = (field) => () => {
  if (errorMessage.value) {
    errorMessage.value = null;
  }
  if (validations.value[field]?.error) {
    clearValidationErrors(validations.value);
  }
};

watch(email, watchField("email"));
watch(password, watchField("password"));

const login = async () => {
  const isValid = validateFields(
    { email: email.value, password: password.value },
    validations.value,
  );

  if (!isValid) return;

  const resMsg = await authStore.login({
    email: email.value,
    password: password.value,
  });
  /* При успешной авторизации перенаправляем пользователя на главную страницу */
  if (resMsg === "success") {
    await authStore.whoAmI();
    await router.push({name: "home"});
  } else {
    errorMessage.value = resMsg;
  }
};

onMounted(() => {
  // Фокусируемся на диалоговом окне, чтобы сработала клавиша Esc без дополнительного клика на окне
  dialog.value.focus();
});

const closeDialog = function () {
  router.push("/");
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/close";
@import "@/assets/scss/blocks/button";
.content {
  display: flex;
  width: 90vw;
  height: 90vh;
  background-color: white;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.login {
  &-card {
    width: 500px;
    height: fit-content;
    background-color: $white;
    box-shadow: $shadow-light;
    display: flex;
    align-content: center;
    flex-direction: column;
    outline: none;

    &__header {
      display: flex;
      justify-content: flex-end;
      background: no-repeat center/100% url("/api/public/img/popup.svg");
      width: 100%;
      height: 130px;
    }
    &__name--min {
      @include b-s24-h28;
      margin: 30px;
    }
    &__close {
      border: none;
      position: relative;
      background-color: transparent;
    }
    .close--white::after,
    .close--white::before {
      position: absolute;
      background-color: $white;
      top: 16px;
      right: 16px;
    }
    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &__block {
      width: 100%;
      box-sizing: content-box;
    }
    &__row {
      display: flex;
      flex-direction: column;
      padding: 0 16px 16px;

      label {
        @include b-s14-h16;
        margin-bottom: 8px;
      }
      input {
        border: 1px solid $silver-300;
        border-radius: 8px;
        background-color: $purple-100;
        padding: 8px 16px;
        @include r-s16-h19;

        &:hover {
          outline: $green-300;
          box-shadow: $shadow-regular;
        }
        &:active,
        &:focus {
          outline: $green-300 1px solid;
        }
      }
    }
    .button {
      margin: 24px 0 40px;
      padding: 8px 16px;
    }
  }
}
.server-error {
  height: 16px;
  color: $red-800;
  margin-top: 20px;
}
.sign-form__input-error,
.server-error {
  height: 16px;
  color: $red-800;
}
.sign-form__input-error {
  margin-top: 4px;
}
.server-error {
  margin-top: 20px;
}
</style>
