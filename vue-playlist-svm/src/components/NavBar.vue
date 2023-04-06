<template>
  <div class='navbar'>
    <nav>
      <img src='../assets/logo.png'>
      <h1>
        <router-link :to='{name: "Home"}'>Music Playlist</router-link>
      </h1>
      <div class='links'>
        <div v-if='user'>
          <router-link :to='{name: "CreatePlaylist"}' class='btn'>Create Playlist</router-link>
          <router-link :to='{name: "UserPlaylists"}' class='btn'>My Playlists</router-link>
          <button @click='handleClick'>Logout</button>
          <span>Hi here, {{ user.email }}</span>
        </div>
        <div v-else>
          <router-link class='btn' :to='{name:"Login"}'>Login</router-link>
          <router-link class='btn' :to='{name:"SignUp"}'>Sign Up</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import useLogout from '../composables/useLogout'
  import getUser from '../composables/getUser'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      const router = useRouter()
      const { logout } = useLogout()
      const { user } = getUser()
      console.log( user )

      const handleClick = async () => {
        await logout()
        console.log( 'user logged out' )
        router.push( { name: 'Login' } )
      }

      return {
        handleClick,
        user
      }
    }
  }
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }

  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  nav h1 {
    margin-left: 20px;
  }

  nav .links {
    margin-left: auto;
  }

  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }

  nav img {
    max-width: 26px;
  }

  .name {
    align-items: center;
    padding: 15px 0 0 10px;
  }

  .name p {
    color: #0b6dff;
  }
  span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }

</style>