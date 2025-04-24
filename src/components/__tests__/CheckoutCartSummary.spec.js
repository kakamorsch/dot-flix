import { mount } from '@vue/test-utils'
import CheckoutCartSummary from '../CheckoutCartSummary.vue'
import { describe, it, expect } from 'vitest'

describe('CheckoutCartSummary', () => {
  it('shows empty cart message when cartItems is empty', () => {
    const wrapper = mount(CheckoutCartSummary, {
      props: { cartItems: [] },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.text()).toContain('Seu carrinho está vazio')
  })

  it('renders cart items and total price', () => {
    const cartItems = [
      { id: 1, title: 'Movie 1', poster_path: '/path1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: '/path2.jpg' },
    ]
    const wrapper = mount(CheckoutCartSummary, {
      props: { cartItems },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.findAll('tbody tr')).toHaveLength(cartItems.length)
    expect(wrapper.text()).toContain('Movie 1')
    expect(wrapper.text()).toContain('Movie 2')
    // Total price should be cartItems.length * 19.99 formatted
    expect(wrapper.text()).toContain('R$ 39.98')
  })
})
