<template>
  <form @submit.prevent='handleSubmit'>
    <h4>Create Neq Playlist</h4>
    <input type='text' required placeholder='Playlist title' v-model='title'>
    <textarea required placeholder='Playlist description...' v-model='description'></textarea>
    <label> Upload playlist cover image</label>
    <input type='file' @change='handleChange'>
    <div class='error'>{{ fileError }}</div>
    <button v-if='!isPending'>Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
  import { ref } from 'vue'
  import useStorage from '../../composables/useStorage'
  import useCollection from '../../composables/useCollection'
  import getUser from '../../composables/getUser'
  import { timestamp } from '../../firebase/config'
  import {useRouter} from 'vue-router'

  export default {
    setup() {
      const { url, filePath, uploadImage } = useStorage()
      const { error, addDoc } = useCollection('playlists')
      const { user } = getUser()

      const router = useRouter()

      const title = ref( 'Test' )
      const description = ref( 'Hello world' )
      const file = ref( null )
      const fileError = ref( null )
      const isPending = ref(false)

      const handleSubmit = async () => {
        if ( file.value ) {
          //start
          isPending.value = true

          await uploadImage( file.value )
          // console.log( 'image uploaded, url:', url.value )
          const res = await addDoc( {
            title: title.value,
            description: description.value,
            userId: user.value.uid,
            userName: user.value.displayName,
            coverUrl: url.value,
            filePath: filePath.value, // so we can delete it later
            songs: [],
            createdAt: timestamp()
          } )
          //end
          isPending.value = false

          if(!error.value) {
            router.push({name: 'PlaylistDetails', params: {id: res.id}})
          }

        } else {
          fileError.value = 'Choose image!!!'
        }
      }

      const types = [ 'image/png', 'image/jpeg' ]

      const handleChange = ( e ) => {
        e.preventDefault()
        const selected = e.target.files[ 0 ]
        // console.log(selected)
        if ( selected && types.includes( selected.type ) ) {
          file.value = selected
          fileError.value = null
        } else {
          file.value = null
          fileError.value = 'Please select an image file(png or jpeg)'
        }
      }

      return {
        title,
        description,
        isPending,
        handleSubmit,
        handleChange,
        fileError,
      }
    }
  }
</script>

<style>
  form {
    background: white;
  }

  input[type='file'] {
    border: 0;
    padding: 0;
  }

  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }

  button {
    margin-top: 20px;
  }
</style>