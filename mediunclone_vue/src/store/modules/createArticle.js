import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationType = {
  createArticleStart: '[createArticle] createArticleStart',
  createArticleSuccess: '[createArticle] createArticleSuccess',
  createArticleFailure: '[createArticle] createArticleFailure',
}

export const actionType = {
  createArticle: '[createArticle] CreatArticle'
}

const mutations = {
  [mutationType.createArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationType.createArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationType.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionType.createArticle](context, {articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationType.createArticleStart)
      articleApi.createArticle(articleInput).then(article => {
        context.commit(mutationType.createArticleSuccess, )
        resolve(article)
      }).catch(result => {
        context.commit(
          mutationType.createArticleFailure,
          result.response.data.errors)
      })
    })
  }
}

export default {
  state,
  actions,
  mutations
}