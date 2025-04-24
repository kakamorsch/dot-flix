import { mount } from '@vue/test-utils'
import MovieItem from '../MovieItem.vue'
import { describe, it, expect } from 'vitest'

describe('MovieItem', () => {
  const item = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
  }

  it('renders movie title and image', () => {
    const wrapper = mount(MovieItem, {
      props: {
        item,
        context: 'favorites',
        isInCart: false,
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.text()).toContain('Test Movie')
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://image.tmdb.org/t/p/w500/test.jpg')
    expect(img.attributes('alt')).toBe('Test Movie')
  })

  it('emits add-to-cart event when add button clicked', async () => {
    const wrapper = mount(MovieItem, {
      props: {
        item,
        context: 'favorites',
        isInCart: false,
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    const addButton = wrapper.find('button[aria-label="Add to cart"]')
    await addButton.trigger('click')
    expect(wrapper.emitted('add-to-cart')).toBeTruthy()
    expect(wrapper.emitted('add-to-cart')[0]).toEqual([item])
  })

  it('emits remove-from-favorites event when remove button clicked', async () => {
    const wrapper = mount(MovieItem, {
      props: {
        item,
        context: 'favorites',
        isInCart: false,
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    const removeButton = wrapper.find('button[aria-label="Remove from favorites"]')
    await removeButton.trigger('click')
    expect(wrapper.emitted('remove-from-favorites')).toBeTruthy()
    expect(wrapper.emitted('remove-from-favorites')[0]).toEqual([item])
  })

  it('emits remove-from-cart event when remove button clicked in cart context', async () => {
    const wrapper = mount(MovieItem, {
      props: {
        item,
        context: 'cart',
        isInCart: false,
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    const removeButton = wrapper.find('button[aria-label="Remove from cart"]')
    await removeButton.trigger('click')
    expect(wrapper.emitted('remove-from-cart')).toBeTruthy()
    expect(wrapper.emitted('remove-from-cart')[0]).toEqual([item])
  })
})
