<template>
  <form @submit.prevent='handleSubmit'>
    <h3>Login</h3>
    <input type='email' placeholder='Email' v-model='email'>
    <input type='password' placeholder='Password' v-model='password'>
    <div v-if='error' class='error'>{{ error }}</div>
    <button v-if='!isPending'>Login in</button>
    <button v-if='isPending' disabled>Loading...</button>
  </form>
</template>

<script>
  import { ref } from 'vue'
  import {useRouter} from 'vue-router'
  import useLogin from '../../composables/useLogin'

  export default {
    setup() {
      const { error, login, isPending } = useLogin()
      const router = useRouter()

      const email = ref( 'svm1@google.com' )
      const password = ref( '1234561' )

      const handleSubmit = async () => {
        const res = await login( email.value, password.value )
        if ( !error.value ) {
          router.push({name: 'UserPlaylists'})
        }
      }

      return {
        email,
        password,
        error,
        isPending,
        handleSubmit
      }
    }

  }
</script>

<style scoped>

</style>