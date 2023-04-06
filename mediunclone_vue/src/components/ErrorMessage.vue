<template>
  <div>{{ message }}</div>
</template>

<script>
  export default {
    name: 'McvErrorMessage',
    message: {
      type: String,
      required: false,
      default: 'Something went wrong'
    }
  }
</script>