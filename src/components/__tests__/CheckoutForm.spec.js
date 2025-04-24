/* eslint-env vitest */
import { mount } from '@vue/test-utils'
import CheckoutForm from '../CheckoutForm.vue'
import { createStore } from 'vuex'
import { describe, it, expect } from 'vitest'
const createVuexStore = (cartLength) => {
  return createStore({
    state() {
      return {
        cart: new Array(cartLength),
      }
    },
  })
}

describe('CheckoutForm', () => {
  it('renders all input fields', () => {
    const store = createVuexStore(1)
    const wrapper = mount(CheckoutForm, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.find('input#name').exists()).toBe(true)
    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('input#cpf').exists()).toBe(true)
    expect(wrapper.find('input#phone').exists()).toBe(true)
    expect(wrapper.find('input#cep').exists()).toBe(true)
    expect(wrapper.find('textarea#address').exists()).toBe(true)
    expect(wrapper.find('input#city').exists()).toBe(true)
    expect(wrapper.find('select#state').exists()).toBe(true)
  })

  it('disables submit button if form is invalid or cart is empty', async () => {
    const storeEmpty = createVuexStore(0)
    const wrapperEmpty = mount(CheckoutForm, {
      global: {
        plugins: [storeEmpty],
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapperEmpty.find('button[type="submit"]').attributes('disabled')).toBeDefined()

    const storeWithItems = createVuexStore(1)
    const wrapperWithItems = mount(CheckoutForm, {
      global: {
        plugins: [storeWithItems],
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    // Initially, form is invalid so button should be disabled
    expect(wrapperWithItems.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })

  it('emits submit event with name when form is valid and submitted', async () => {
    const store = createVuexStore(1)
    const wrapper = mount(CheckoutForm, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    // Set valid form data
    await wrapper.find('input#name').setValue('John Doe')
    await wrapper.find('input#email').setValue('john@example.com')
    await wrapper.find('input#cpf').setValue('123.456.789-00')
    await wrapper.find('input#phone').setValue('(12) 34567-8901')
    await wrapper.find('input#cep').setValue('12345-678')
    await wrapper.find('textarea#address').setValue('123 Main St')
    await wrapper.find('input#city').setValue('City')
    await wrapper.find('select#state').setValue('SP')

    // Trigger blur to mark fields as touched
    await wrapper.find('input#name').trigger('blur')
    await wrapper.find('input#email').trigger('blur')
    await wrapper.find('input#cpf').trigger('blur')
    await wrapper.find('input#phone').trigger('blur')
    await wrapper.find('input#cep').trigger('blur')
    await wrapper.find('textarea#address').trigger('blur')
    await wrapper.find('input#city').trigger('blur')
    await wrapper.find('select#state').trigger('blur')

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(wrapper.emitted('submit')[0]).toEqual([{ name: 'John Doe' }])
  })
})
