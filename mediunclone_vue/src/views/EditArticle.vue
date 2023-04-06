<template>
  <div>
    <mcv-loading v-if='isLoading'/>
    <mcv-article-form
      v-if='initialValues'
      :initial-values='initialValues'
      :errors='validationErrors'
      :isSubmitting='isSubmitting'
      @articleSubmit='onSubmit'
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import McvArticleForm from '@/components/ArticleForm'
  import McvLoading from '@/components/Loading'
  import { actionType } from '@/store/modules/editArticle'

  export default {
    name: 'McvEditArticle',
    // data() {
    //   return {
    //     initialValues: {
    //       title: '',
    //       description: '',
    //       body: '',
    //       tagList: []
    //     }
    //   }
    // },
    computed: {
      ...mapState({
        isSubmitting: state => state.editArticle.isSubmitting,
        isLoading: state => state.editArticle.isLoading,
        validationErrors: state => state.editArticle.validationErrors,
        article: state => state.editArticle.article
      }),
      initialValues() {
        if (!this.article) {
          return null
        }
        return {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList
        }
      }
    },
    mounted() {
      this.$store.dispatch(actionType.getArticle, {
        slug: this.$route.params.slug
      })
    },
    methods: {
      onSubmit(articleInput) {
        const slug = this.$route.params.slug
        this.$store.dispatch(actionType.updateArticle, {slug,  articleInput })
          .then(article => {
            this.$router.push({ name: 'article', params: { slug: article.slug } })
          })
      }
    },
    components: {
      McvArticleForm,
      McvLoading
    }
  }
</script>