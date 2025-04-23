/**
 * Applies CPF mask to the input value
 * @param {string} value - The input value to be masked
 * @returns {string} - The masked value
 */
export const cpfMask = (value) => {
  if (!value) return ''

  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '')

  // Limit to 11 digits
  const cpf = numbers.slice(0, 11)

  // Apply mask: XXX.XXX.XXX-XX
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

/**
 * Applies phone mask to the input value
 * @param {string} value - The input value to be masked
 * @returns {string} - The masked value
 */
export const phoneMask = (value) => {
  if (!value) return ''

  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '')

  // Limit to 11 digits (including area code)
  const phone = numbers.slice(0, 11)

  // Apply mask: (XX) XXXXX-XXXX
  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3')
  }
  return phone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')
}

/**
 * Applies CEP mask to the input value
 * @param {string} value - The input value to be masked
 * @returns {string} - The masked value
 */
export const cepMask = (value) => {
  if (!value) return ''

  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '')

  // Limit to 8 digits
  const cep = numbers.slice(0, 8)

  // Apply mask: XXXXX-XXX
  return cep.replace(/(\d{5})(\d{3})/g, '$1-$2')
}

/**
 * Validates email format
 * @param {string} value - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

/**
 * Creates a masked input handler
 * @param {Function} maskFn - The mask function to apply
 * @param {Function} updateValue - The function to update the value
 * @returns {Function} - The event handler
 */
export const createMaskedInputHandler = (maskFn, updateValue) => {
  return (event) => {
    const value = event.target.value
    const maskedValue = maskFn(value)
    updateValue(maskedValue)

    // Update the input value to show the mask
    event.target.value = maskedValue
  }
}
