<template>
  <div class='container'>
    <Navbar/>
    <ChatWindow/>
    <NewChatForm/>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router'
  import { watch } from 'vue'
  import getUser from '../cumposable/getUser'

  import Navbar from '../components/Navbar'
  import NewChatForm from '../components/NewChatForm'
  import ChatWindow from '../components/ChatWindow'


  export default {
    components: { Navbar, NewChatForm, ChatWindow },
    setup() {
      const { user } = getUser()
      const router = useRouter()

      watch( user, () => {
        if ( !user.value ) {
          router.push( { name: 'Welcome' } )
        }
      } )
    }
  }
</script>

<style scoped>

</style>