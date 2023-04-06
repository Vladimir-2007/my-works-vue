<template>
  <form @submit.prevent='handleSubmit'>
    <input type='email' required placeholder='email' v-model='email'>
    <input type='password' required placeholder='password' v-model='password'>
    <div class='error'>{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
  import { ref } from 'vue'
  import useLogin from '../cumposable/useLogin'

  export default {
    setup(props, context) {
      //refs
      const email = ref('ivan@com.ru')
      const password = ref('123456')

      const { error, login } = useLogin()

      const handleSubmit = async () => {
        await login(email.value, password.value)
        if (!error.value) {
          context.emit('login')
        }
      }

      return {
        email,
        password,
        handleSubmit,
        error
      }
    }
  }
</script>

<style scoped>

</style>