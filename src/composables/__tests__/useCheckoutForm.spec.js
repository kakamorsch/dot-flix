import { describe, it, expect } from 'vitest'
import { useCheckoutForm } from '../useCheckoutForm'

describe('useCheckoutForm', () => {
  it('initializes all fields as empty strings', () => {
    const { name, email, cpf, phone, cep, address, city, state } = useCheckoutForm()

    expect(name.value).toBe('')
    expect(email.value).toBe('')
    expect(cpf.value).toBe('')
    expect(phone.value).toBe('')
    expect(cep.value).toBe('')
    expect(address.value).toBe('')
    expect(city.value).toBe('')
    expect(state.value).toBe('')
  })

  it('isFormValid returns false for empty fields', () => {
    const { isFormValid } = useCheckoutForm()
    expect(isFormValid.value).toBe(false)
  })

  it('isFormValid returns true for valid fields', () => {
    const { name, email, cpf, phone, cep, address, city, state, isFormValid } = useCheckoutForm()

    name.value = 'John Doe'
    email.value = 'john@example.com'
    cpf.value = '123.456.789-00'
    phone.value = '(12) 34567-8901'
    cep.value = '12345-678'
    address.value = '123 Main St'
    city.value = 'City'
    state.value = 'SP'

    expect(isFormValid.value).toBe(true)
  })
})
