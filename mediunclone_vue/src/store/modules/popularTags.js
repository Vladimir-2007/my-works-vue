import popularTagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationType = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
  getPopularTagsFailure: '[popularTags] getPopularTagsFailure',
}

export const actionTypes = {
  getPopularTags: '[popularTags] getPopularTags',
}

const mutations = {
  [mutationType.getPopularTagsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationType.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationType.getPopularTagsFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutationType.getPopularTagsStart)
      popularTagsApi
        .getPopularTags()
        .then(tags => {
          context.commit(mutationType.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationType.getPopularTagsFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
