import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SideBar from '../SideBar.vue'
import { createStore } from 'vuex'

const createVuexStore = (cartItems = [], favoriteMovies = []) => {
  return createStore({
    state() {
      return {
        cart: cartItems,
        favorites: favoriteMovies,
      }
    },
    mutations: {
      removeFromCart(state, id) {
        state.cart = state.cart.filter((item) => item.id !== id)
      },
      removeFromFavorites(state, id) {
        state.favorites = state.favorites.filter((movie) => movie.id !== id)
      },
      addToCart(state, movie) {
        state.cart.push(movie)
      },
    },
  })
}

describe('SideBar', () => {
  it('renders empty cart message when cart is empty', () => {
    const store = createVuexStore([])
    const wrapper = mount(SideBar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': true,
        },
      },
      props: {
        content: 'cart',
      },
    })
    expect(wrapper.text()).toContain('Seu carrinho está vazio')
  })

  it('renders cart items and total price', () => {
    const cartItems = [
      { id: 1, title: 'Movie 1', poster_path: '/path1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: '/path2.jpg' },
    ]
    const store = createVuexStore(cartItems)
    const wrapper = mount(SideBar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': true,
        },
      },
      props: {
        content: 'cart',
      },
    })
    expect(wrapper.findAllComponents({ name: 'MovieItem' })).toHaveLength(cartItems.length)
    expect(wrapper.text()).toContain('R$ 39.98')
  })

  it('renders empty favorites message when no favorites', () => {
    const store = createVuexStore([], [])
    const wrapper = mount(SideBar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': true,
        },
      },
      props: {
        content: 'favorites',
      },
    })
    expect(wrapper.text()).toContain('Você ainda não tem favoritos')
  })

  it('renders favorite movies', () => {
    const favoriteMovies = [
      { id: 1, title: 'Fav 1', poster_path: '/fav1.jpg' },
      { id: 2, title: 'Fav 2', poster_path: '/fav2.jpg' },
    ]
    const store = createVuexStore([], favoriteMovies)
    const wrapper = mount(SideBar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': true,
        },
      },
      props: {
        content: 'favorites',
      },
    })
    expect(wrapper.findAllComponents({ name: 'MovieItem' })).toHaveLength(favoriteMovies.length)
  })

  it('emits close event when close button clicked', async () => {
    const store = createVuexStore()
    const wrapper = mount(SideBar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': true,
        },
      },
      props: {
        content: 'cart',
      },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
