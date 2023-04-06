import addToFavoritesApi from '@/api/addToFavorites'

export const mutationType = {
  addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
  addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
  addToFavoritesFailure: '[addToFavorites] addToFavoritesFailure'
}

export const actionType = {
  addToFavorites: '[addToFavorites] addToFavorites'
}

const mutations = {
  [mutationType.addToFavoritesStart](){},
  [mutationType.addToFavoritesSuccess](){},
  [mutationType.addToFavoritesFailure](){},
}

const actions = {
  [actionType.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(mutationType.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)

      promise.then(article => {
        context.commit(mutationType.addToFavoritesSuccess, article)
        resolve(article)
      }).catch(() => {
        context.commit(mutationType.addToFavoritesFailure)
      })
    })
  }
}

export default {
  actions,
  mutations
}