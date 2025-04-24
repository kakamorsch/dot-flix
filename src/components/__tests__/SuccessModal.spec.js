import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SuccessModal from '../SuccessModal.vue'

describe('SuccessModal', () => {
  it('renders when show is true and displays userName', () => {
    const wrapper = mount(SuccessModal, {
      props: {
        show: true,
        userName: 'John',
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.text()).toContain('Obrigado John!')
    expect(wrapper.text()).toContain('Sua compra foi finalizada com sucesso!')
  })

  it('does not render when show is false', () => {
    const wrapper = mount(SuccessModal, {
      props: {
        show: false,
        userName: 'John',
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.find('div.fixed').exists()).toBe(false)
  })

  it('emits close event when background or link clicked', async () => {
    const wrapper = mount(SuccessModal, {
      props: {
        show: true,
        userName: 'John',
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    await wrapper.find('div.absolute').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')

    await wrapper.find('a').trigger('click')
    expect(wrapper.emitted('close').length).toBe(2)
  })
})
