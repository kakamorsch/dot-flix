<template>
  <form @submit.prevent="submitOrder" class="space-y-4">
    <p class="text-sm text-gray-600 mb-4">* Todos os campos são obrigatórios</p>
    <div>
      <label for="name" class="block text-sm font-medium mb-1">Nome Completo</label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
        :class="{
          'border-red-500': nameTouched && !name.trim(),
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(nameTouched && !name.trim()),
        }"
        @blur="nameTouched = true"
        placeholder="Digite seu nome"
      />
      <p v-if="nameTouched && !name.trim()" class="text-red-500 text-xs mt-1">Nome é obrigatório</p>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium mb-1"> E-mail </label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        :class="{
          'border-red-500': emailTouched && (!email.trim() || !isValidEmail(email)),
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(
            emailTouched &&
            (!email.trim() || !isValidEmail(email))
          ),
        }"
        @blur="emailTouched = true"
        placeholder="Digite seu e-mail"
      />
      <p v-if="emailTouched && !email.trim()" class="text-red-500 text-xs mt-1">
        E-mail é obrigatório
      </p>
      <p v-else-if="emailTouched && !isValidEmail(email)" class="text-red-500 text-xs mt-1">
        E-mail inválido
      </p>
    </div>
    <div>
      <label for="cpf" class="block text-sm font-medium mb-1">CPF</label>
      <input
        id="cpf"
        :value="cpf"
        @input="handleCpfInput"
        type="text"
        required
        maxlength="14"
        :class="{
          'border-red-500': cpfTouched && cpf.length !== 14,
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(cpfTouched && cpf.length !== 14),
        }"
        @blur="cpfTouched = true"
        placeholder="000.000.000-00"
      />
      <p v-if="cpfTouched && cpf.length !== 14" class="text-red-500 text-xs mt-1">CPF inválido</p>
    </div>
    <div>
      <label for="phone" class="block text-sm font-medium mb-1">Telefone</label>
      <input
        id="phone"
        :value="phone"
        @input="handlePhoneInput"
        type="tel"
        required
        maxlength="15"
        :class="{
          'border-red-500': phoneTouched && phone.length < 14,
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(phoneTouched && phone.length < 14),
        }"
        @blur="phoneTouched = true"
        placeholder="(00) 00000-0000"
      />
      <p v-if="phoneTouched && phone.length < 14" class="text-red-500 text-xs mt-1">
        Telefone inválido
      </p>
    </div>
    <div>
      <label for="cep" class="block text-sm font-medium mb-1">CEP</label>
      <input
        id="cep"
        :value="cep"
        @input="handleCepInput"
        type="text"
        required
        maxlength="9"
        :class="{
          'border-red-500': cepTouched && cep.length !== 9,
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(cepTouched && cep.length !== 9),
        }"
        @blur="cepTouched = true"
        placeholder="00000-000"
      />
      <p v-if="cepTouched && cep.length !== 9" class="text-red-500 text-xs mt-1">CEP inválido</p>
    </div>
    <div>
      <label for="address" class="block text-sm font-medium mb-1">Endereço</label>
      <textarea
        id="address"
        v-model="address"
        required
        :class="{
          'border-red-500': addressTouched && !address.trim(),
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(addressTouched && !address.trim()),
        }"
        @blur="addressTouched = true"
        rows="3"
        placeholder="Digite seu endereço completo"
      ></textarea>
      <p v-if="addressTouched && !address.trim()" class="text-red-500 text-xs mt-1">
        Endereço é obrigatório
      </p>
    </div>
    <div>
      <label for="city" class="block text-sm font-medium mb-1">Cidade</label>
      <input
        id="city"
        v-model="city"
        type="text"
        required
        :class="{
          'border-red-500': cityTouched && !city.trim(),
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(cityTouched && !city.trim()),
        }"
        @blur="cityTouched = true"
        placeholder="Digite sua cidade"
      />
      <p v-if="cityTouched && !city.trim()" class="text-red-500 text-xs mt-1">
        Cidade é obrigatória
      </p>
    </div>
    <div>
      <label for="state" class="block text-sm font-medium mb-1">Estado</label>
      <select
        id="state"
        v-model="state"
        required
        :class="{
          'border-red-500': stateTouched && !state,
          'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2': true,
          'border-gray-300 focus:ring-indigo-500': !(stateTouched && !state),
        }"
        @blur="stateTouched = true"
      >
        <option value="" disabled>Selecione o estado</option>
        <option v-for="option in states" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <p v-if="stateTouched && !state" class="text-red-500 text-xs mt-1">Estado é obrigatório</p>
    </div>
    <button
      type="submit"
      class="w-full bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      :disabled="!isFormValid || cartIsEmpty"
      :class="{ 'opacity-50 cursor-not-allowed': !isFormValid || cartIsEmpty }"
    >
      Finalizar
    </button>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCheckoutForm } from '../composables/useCheckoutForm'
import { isValidEmail } from '../utils/masks'
import { useStore } from 'vuex'
const emit = defineEmits(['submit'])

const {
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
} = useCheckoutForm()

const store = useStore()
const cartIsEmpty = computed(() => store.state.cart.length === 0)

const states = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

const nameTouched = ref(false)
const emailTouched = ref(false)
const cpfTouched = ref(false)
const phoneTouched = ref(false)
const cepTouched = ref(false)
const addressTouched = ref(false)
const cityTouched = ref(false)
const stateTouched = ref(false)

const submitOrder = () => {
  nameTouched.value = true
  emailTouched.value = true
  cpfTouched.value = true
  phoneTouched.value = true
  cepTouched.value = true
  addressTouched.value = true
  cityTouched.value = true
  stateTouched.value = true

  if (!isFormValid.value || cartIsEmpty.value) {
    return
  }
  emit('submit', { name: name.value })
}
</script>
