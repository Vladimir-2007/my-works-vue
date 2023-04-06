<template>
<NavBar />
  <div class='content'>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'

  export default {
    components: { NavBar }
  }

</script>

<style>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }
</style>

