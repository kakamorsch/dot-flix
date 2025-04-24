import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

vi.mock('vuex', () => ({
  useStore: vi.fn(),
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

describe('SearchBar.vue', () => {
  let store
  let router

  beforeEach(() => {
    store = {
      state: {
        cart: [],
        favorites: [],
      },
    }
    router = {
      push: vi.fn(),
    }
    useStore.mockReturnValue(store)
    useRouter.mockReturnValue(router)
  })

  const mountComponent = (props = {}) => {
    return mount(SearchBar, {
      props: {
        showSidebar: false,
        sidebarContent: '',
        ...props,
      },
      global: {
        stubs: {
          'router-link': true,
        },
      },
    })
  }

  it('renders input and buttons', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.findAll('button').length).toBeGreaterThanOrEqual(2)
  })

  it('shows cart and favorites counts when state has items', () => {
    store.state.cart = [1, 2]
    store.state.favorites = [1]
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('1')
  })

  it('emits toggle-sidebar event with "cart" when cart button clicked', async () => {
    const wrapper = mountComponent()
    const buttons = wrapper.findAll('button.p-2')
    const cartButton = buttons[0]
    await cartButton.trigger('click')
    expect(wrapper.emitted('toggle-sidebar')).toBeTruthy()
    expect(wrapper.emitted('toggle-sidebar')[0]).toEqual(['cart'])
  })

  it('emits toggle-sidebar event with "favorites" when favorites button clicked', async () => {
    const wrapper = mountComponent()
    const buttons = wrapper.findAll('button.p-2')
    const favButton = buttons[1]
    await favButton.trigger('click')
    expect(wrapper.emitted('toggle-sidebar')).toBeTruthy()
    expect(wrapper.emitted('toggle-sidebar')[0]).toEqual(['favorites'])
  })

  it('calls router.push with query on input after debounce', async () => {
    vi.useFakeTimers()
    const wrapper = mountComponent()
    const input = wrapper.find('input[type="text"]')
    await input.setValue('test search')
    vi.advanceTimersByTime(300)
    expect(router.push).toHaveBeenCalledWith({ path: '/', query: { q: 'test search' } })
    vi.useRealTimers()
  })
})
