import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
}

export const mutationType = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

  logout: '[auth] logout'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: state => {
    return state.isLoggedIn === false
  },
}

const mutations = {
  [mutationType.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationType.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationType.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationType.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationType.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationType.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationType.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationType.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationType.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },
  [mutationType.updateCurrentUserStart]() {},
  [mutationType.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload
  },
  [mutationType.updateCurrentUserFailure]() {},
  [mutationType.logout](state) {
    state.currentUser = null
    state.isLoggedIn = false
  }
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationType.registerStart)
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationType.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(
            mutationType.registerFailure,
            result.response.data.errors
          )
          console.log('result errors', result)
        })
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationType.loginStart)
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationType.loginSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationType.loginFailure, result.response.data.errors)
          console.log('result errors', result)
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationType.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(mutationType.getCurrentUserSuccess, response.data.user)
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationType.getCurrentUserFailure)
        })
    })
  },
  [actionTypes.updateCurrentUser](context, {currentUserInput}) {
    return new Promise(resolve => {
      context.commit(mutationType.updateCurrentUserStart)
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
          context.commit(mutationType.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(mutationType.updateCurrentUserFailure, result.response.data.errors)
        })
    })
  },
  [actionTypes.logout](context) {
    return new Promise(resolve => {
      setItem('accessToken', '')
      context.commit(mutationType.logout)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
