import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '../MovieCard.vue'
import { useStore } from 'vuex'

vi.mock('../../enums/genres.enum', () => ({
  getGenreName: (id) => {
    const genres = {
      1: 'Action',
      2: 'Comedy',
      3: 'Drama',
    }
    return genres[id] || ''
  },
}))

vi.mock('vuex', () => ({
  useStore: vi.fn(),
}))

describe('MovieCard.vue', () => {
  let store
  let movie

  beforeEach(() => {
    movie = {
      id: 1,
      title: 'Test Movie',
      poster_path: '/test.jpg',
      release_date: '2023-01-01',
      vote_average: 7.5,
      genre_ids: [1, 2, 3],
    }

    store = {
      getters: {
        favoriteMovies: [],
        cartItems: [],
      },
      commit: vi.fn(),
    }

    useStore.mockReturnValue(store)
  })

  const mountComponent = () => {
    return mount(MovieCard, {
      props: { movie },
    })
  }

  it('renders movie title, poster, release date, vote average and genres', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain(movie.title)
    expect(wrapper.find('img').attributes('src')).toBe(
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    )
    const releaseDateText = wrapper.text().match(/Lançamento: (.+)/)
    expect(releaseDateText).toBeTruthy()
    const dateStr = releaseDateText ? releaseDateText[1].trim() : ''
    expect(dateStr.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('7.5/10')
    expect(wrapper.findAll('span.text-xs.px-2.py-1.bg-gray-100.rounded-full').length).toBe(3)
  })

  it('shows "Adicionar" button when movie is not in cart and "No Carrinho" when it is', async () => {
    let wrapper = mountComponent()
    const addToCartButton = wrapper.find('button.w-full.bg-indigo-600')
    expect(addToCartButton.text()).toBe('Adicionar')

    store.getters.cartItems = [movie]
    store.commit.mockClear()
    wrapper = mountComponent()
    const addToCartButtonAfter = wrapper.find('button.w-full.bg-indigo-600')
    expect(addToCartButtonAfter.text()).toBe('No Carrinho')
    expect(addToCartButtonAfter.attributes('disabled')).toBeDefined()
  })

  it('toggles favorite status when favorite button is clicked', async () => {
    // Movie not favorite initially
    const wrapper = mountComponent()
    const favButton = wrapper.find('button.absolute.top-2.right-2')

    await favButton.trigger('click')
    expect(store.commit).toHaveBeenCalledWith('addToFavorites', movie)

    store.getters.favoriteMovies = [movie]
    store.commit.mockClear()
    const wrapperFav = mountComponent()
    const favButtonFav = wrapperFav.find('button.absolute.top-2.right-2')

    await favButtonFav.trigger('click')
    expect(store.commit).toHaveBeenCalledWith('removeFromFavorites', movie.id)
  })

  it('adds movie to cart when add to cart button is clicked and movie is not in cart', async () => {
    const wrapper = mountComponent()
    const addToCartButton = wrapper.find('button.w-full.bg-indigo-600')

    await addToCartButton.trigger('click')
    expect(store.commit).toHaveBeenCalledWith('addToCart', movie)
  })

  it('does not add movie to cart when movie is already in cart', async () => {
    store.getters.cartItems = [movie]
    store.commit.mockClear()
    const wrapper = mountComponent()
    const addToCartButton = wrapper.find('button.w-full.bg-indigo-600')

    await addToCartButton.trigger('click')
    expect(store.commit).not.toHaveBeenCalledWith('addToCart', movie)
  })
})
