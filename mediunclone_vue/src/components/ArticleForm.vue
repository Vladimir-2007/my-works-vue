<template>
  <div class='editor-page'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-10 offset-md-1 col-xs-12'>
          <mcv-validation-errors v-if='errors' :validation-errors='errors'/>
          <form @submit.prevent='onSubmit'>
            <fieldset>
              <fieldset class='form-group'>
                <label for='title' class='label'>Title:</label>
                <input
                  id='title'
                  type='text'
                  class='form-control form-control-lg'
                  placeholder='Article Title'
                  v-model='title'
                >
              </fieldset>
            </fieldset>
            <fieldset>
              <fieldset class='form-group'>
                <label for='description' class='label'>Description:</label>
                <input
                  id='description'
                  type='text'
                  class='form-control form-control-lg'
                  placeholder='Description'
                  v-model='description'
                >
              </fieldset>
            </fieldset>
            <fieldset>
              <fieldset class='form-group'>
                <label for='textarea' class='label'>What is this article about? </label>
                <textarea
                  id='textarea'
                  class='form-control form-control-lg'
                  placeholder='What is this article about'
                  v-model='body'
                ></textarea>
              </fieldset>
            </fieldset>
            <fieldset>
              <fieldset class='form-group'>
                <label for='taglist' class='label'>Tag List:</label>
                <input
                  id='taglist'
                  type='text'
                  class='form-control form-control-lg'
                  placeholder='Enter tags'
                  v-model='tagList'
                >
              </fieldset>
            </fieldset>
            <fieldset class='form-group'>
              <button
                type='submit'
                class='btn btn-lg pull pull-xs-right btn-primary'
                :disabled='isSubmitting'
              >
                Publish article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import McvValidationErrors from '@/components/ValidationErrors'

  export default {
    // emits: ['articleSubmit'],
    name: 'McvArticleForm',
    props: {
      initialValues: {
        type: Object,
        required: true
      },
      errors: {
        type: Object,
        required: false
      },
      isSubmitting: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        title: this.initialValues.title,
        description: this.initialValues.description,
        body: this.initialValues.body,
        tagList: this.initialValues.tagList.join(' ')
      }
    },
    methods: {
      onSubmit() {
        const form = {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagList.split(' ')
        }
        this.$emit('articleSubmit', form)
      }
    },
    components: {
      McvValidationErrors
    }
  }
</script>
<style scoped>
  .label {
    font-weight: bold;
  }

</style>