import { createStore } from 'vuex'
import { fetchMovies } from '@/services/tmdb'
const store = createStore({
  state: {
    cart: [],
    favorites: [],
    movies: [],
  },
  mutations: {
    addToCart(state, movie) {
      state.cart.push(movie)
    },
    removeFromCart(state, movieId) {
      state.cart = state.cart.filter((movie) => movie.id !== movieId)
    },
    addToFavorites(state, movie) {
      state.favorites.push(movie)
    },
    removeFromFavorites(state, movieId) {
      state.favorites = state.favorites.filter((movie) => movie.id !== movieId)
    },
    setMovies(state, movies) {
      state.movies = movies
    },
  },
  actions: {
    async FETCH_MOVIES({ commit }, titulo = '') {
      const movies = await fetchMovies(titulo)
      commit('setMovies', movies)
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    favoriteMovies: (state) => state.favorites,
    movies: (state) => state.movies,
  },
})

export default store
