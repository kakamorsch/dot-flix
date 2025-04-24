import { ref, computed } from 'vue'
import { cpfMask, phoneMask, cepMask, isValidEmail, createMaskedInputHandler } from '../utils/masks'

export function useCheckoutForm() {
  const name = ref('')
  const email = ref('')
  const cpf = ref('')
  const phone = ref('')
  const cep = ref('')
  const address = ref('')
  const city = ref('')
  const state = ref('')

  const handleCpfInput = createMaskedInputHandler(cpfMask, (value) => (cpf.value = value))
  const handlePhoneInput = createMaskedInputHandler(phoneMask, (value) => (phone.value = value))
  const handleCepInput = createMaskedInputHandler(cepMask, (value) => (cep.value = value))

  const isFormValid = computed(() => {
    return (
      Boolean(name.value.trim()) &&
      Boolean(email.value.trim()) &&
      isValidEmail(email.value) &&
      cpf.value.length === 14 && // XXX.XXX.XXX-XX
      phone.value.length >= 14 && // (XX) XXXXX-XXXX
      cep.value.length === 9 && // XXXXX-XXX
      Boolean(address.value.trim()) &&
      Boolean(city.value.trim()) &&
      Boolean(state.value.trim())
    )
  })

  return {
    name,
    email,
    cpf,
    phone,
    cep,
    address,
    city,
    state,
    handleCpfInput,
    handlePhoneInput,
    handleCepInput,
    isFormValid,
  }
}
