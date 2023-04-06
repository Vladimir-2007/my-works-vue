import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationType = {
  getUserProfileStart: '[userProfile] UserProfileStart',
  getUserProfileSuccess: '[userProfile] UserProfileSuccess',
  getUserProfileFailure: '[userProfile] UserProfileFailure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile',
}

const mutations = {
  [mutationType.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationType.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationType.getUserProfileFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationType.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          context.commit(mutationType.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationType.getUserProfileFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
