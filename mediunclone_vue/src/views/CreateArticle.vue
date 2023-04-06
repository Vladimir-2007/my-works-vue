<template>
  <mcv-article-form
    :initial-values='initialValues'
    :errors='validationErrors'
    :isSubmitting='isSubmitting'
    @articleSubmit='onSubmit'
  />
</template>

<script>
  import { mapState } from 'vuex'
  import McvArticleForm from '@/components/ArticleForm'
  import { actionType } from '@/store/modules/createArticle'

  export default {
    name: 'McvCreateArticle',
    data() {
      return {
        initialValues: {
          title: '',
          description: '',
          body: '',
          tagList: []
        },
      }
    },
    computed: {
      ...mapState({
        isSubmitting: state => state.createArticle.isSubmitting,
        validationErrors: state => state.createArticle.validationErrors
      })
    },
    methods: {
      onSubmit(articleInput) {
        this.$store.dispatch(actionType.createArticle, {articleInput})
          .then(article => {
            this.$router.push({name: 'article', params: {slug: article.slug}})
        })
      }
    },
    components: {
      McvArticleForm
    }
  }
</script>