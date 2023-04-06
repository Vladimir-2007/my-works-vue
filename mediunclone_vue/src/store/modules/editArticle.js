import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null

}

export const mutationType = {
  updateArticleStart: '[updateArticle] updateArticleStart',
  updateArticleSuccess: '[updateArticle] updateArticleSuccess',
  updateArticleFailure: '[updateArticle] updateArticleFailure',

  getArticleStart: '[getArticle] getArticleStart',
  getArticleSuccess: '[getArticle] getArticleSuccess',
  getArticleFailure: '[getArticle] getArticleFailure'
}

export const actionType = {
  updateArticle: '[updateArticle] updateArticle',
  getArticle: '[getArticle] getArticle'
}

const mutations = {
  [mutationType.updateArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationType.updateArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationType.updateArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationType.getArticleStart](state) {
    state.isLoading = true
  },
  [mutationType.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.article = payload
  },
  [mutationType.getArticleFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionType.updateArticle](context, { slug, articleInput }) {
    return new Promise(resolve => {
      context.commit(mutationType.updateArticleStart)
      articleApi
        .updateArticle(slug, articleInput).then(article => {
        context.commit(mutationType.updateArticleSuccess, article)
        resolve(article)
      }).catch(result => {
        context.commit(
          mutationType.updateArticleFailure, result.response.data.errors)
      })
    })
  },
  [actionType.getArticle](context, { slug }) {
    return new Promise(resolve => {
      context.commit(mutationType.getArticleStart)
      articleApi
        .getArticle(slug).then(article => {
        context.commit(mutationType.getArticleSuccess, article)
        resolve(article)
      }).catch(() => {
        context.commit(mutationType.getArticleFailure)
      })
    })
  }

}

export default {
  state,
  actions,
  mutations
}