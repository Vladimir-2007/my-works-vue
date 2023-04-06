import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationType = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure'
}

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle'
}

const mutations = {
  [mutationType.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationType.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationType.getArticleFailure](state) {
    state.isLoading = false
  },
  [mutationType.deleteArticleStart]() {},
  [mutationType.deleteArticleSuccess]() {},
  [mutationType.deleteArticleFailure]() {},
}

const actions = {
  [actionTypes.getArticle](context, { slug }) {
    return new Promise(resolve => {
      context.commit(mutationType.getArticleStart, slug)
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationType.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationType.getArticleFailure)
        })
    })
  },
  [actionTypes.deleteArticle](context, { slug }) {
    return new Promise(resolve => {
      context.commit(mutationType.deleteArticleStart)
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationType.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationType.deleteArticleFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations
}
