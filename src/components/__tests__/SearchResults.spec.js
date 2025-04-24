/* global global */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchResults from '../SearchResults.vue'
import MovieCard from '../MovieCard.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

vi.mock('vuex', () => ({
  useStore: vi.fn(),
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}))

global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    this.callback([{ isIntersecting: true }])
  }
  unobserve() {}
  disconnect() {}
}

describe('SearchResults.vue', () => {
  let store
  let route

  beforeEach(() => {
    store = {
      dispatch: vi.fn(),
      getters: {
        moviesData: {
          results: [],
          total_pages: 1,
        },
      },
    }
    route = {
      query: { q: '' },
    }
    useStore.mockReturnValue(store)
    useRoute.mockReturnValue(route)
  })

  const mountComponent = () => {
    return mount(SearchResults, {
      global: {
        stubs: {
          MovieCard: {
            template: '<div />',
          },
        },
      },
    })
  }

  it('renders MovieCard components for each movie', async () => {
    store.getters.moviesData.results = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ]
    const wrapper = mountComponent()
    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.findAllComponents(MovieCard).length).toBe(2)
  })

  it('shows no results message when no movies and not loading', async () => {
    store.getters.moviesData.results = []
    const wrapper = mountComponent()
    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.text()).toContain('Nenhum filme encontrado para "".')
  })

  it('shows loading message when isLoading is true', async () => {
    const wrapper = mountComponent()
    wrapper.vm.isLoading = true
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Carregando mais filmes...')
  })

  it('shows error message when error is set', async () => {
    const wrapper = mountComponent()
    wrapper.vm.error = 'Erro de teste'
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Erro ao carregar filmes: Erro de teste')
  })

  it('calls store.dispatch FETCH_MOVIES on mount', async () => {
    mountComponent()
    expect(store.dispatch).toHaveBeenCalledWith('FETCH_MOVIES', { query: '', page: 1 })
  })

  it('reloads movies when route query changes', async () => {
    const wrapper = mountComponent()
    route.query.q = 'new query'
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith('FETCH_MOVIES', { query: '', page: 1 })
  })
})
