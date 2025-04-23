import { createStore } from 'vuex'
import { fetchMovies } from '../services/tmdb'

const store = createStore({
  state: {
    cart: [],
    favorites: [],
    moviesData: {
      results: [],
      page: 1,
      total_pages: 1,
    },
  },
  mutations: {
    addToCart(state, movie) {
      // Only add if not already in cart
      if (!state.cart.some((item) => item.id === movie.id)) {
        state.cart.push(movie)
      }
    },
    removeFromCart(state, movieId) {
      state.cart = state.cart.filter((movie) => movie.id !== movieId)
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    addToFavorites(state, movie) {
      if (!state.favorites.some((item) => item.id === movie.id)) {
        state.favorites.push(movie)
      }
    },
    removeFromFavorites(state, movieId) {
      state.favorites = state.favorites.filter((movie) => movie.id !== movieId)
    },
    setMoviesData(state, payload) {
      if (payload.page === 1) {
        state.moviesData = payload
      } else {
        state.moviesData = {
          ...payload,
          results: [...state.moviesData.results, ...payload.results],
        }
      }
    },
  },
  actions: {
    async FETCH_MOVIES({ commit }, { query, page = 1 }) {
      try {
        const data = await fetchMovies(query, page)
        commit('setMoviesData', {
          results: data.results,
          page: data.page,
          total_pages: data.total_pages,
        })
        return data
      } catch (error) {
        console.error('Error fetching movies:', error)
        throw error
      }
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    favoriteMovies: (state) => state.favorites,
    moviesData: (state) => state.moviesData,
  },
})

export default store
