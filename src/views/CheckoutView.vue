<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Finalizar Compra</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <form @submit.prevent="submitOrder" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Nome Completo</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Digite seu nome"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium mb-1">
            E-mail
            <span v-if="email && !isValidEmail(email)" class="text-red-500 text-xs ml-1">
              (E-mail inválido)
            </span>
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            :class="{
              'border-red-500': email && !isValidEmail(email),
              'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2': true,
              'focus:ring-red-500': email && !isValidEmail(email),
              'focus:ring-indigo-500': !email || isValidEmail(email),
            }"
            placeholder="Digite seu e-mail"
          />
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
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="000.000.000-00"
          />
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
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="(00) 00000-0000"
          />
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
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="00000-000"
          />
        </div>
        <div>
          <label for="address" class="block text-sm font-medium mb-1">Endereço</label>
          <textarea
            id="address"
            v-model="address"
            required
            rows="3"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Digite seu endereço completo"
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          :disabled="!isFormValid || cartItems.length === 0"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid || cartItems.length === 0 }"
        >
          Finalizar
        </button>
      </form>

      <div class="bg-gray-50 p-6 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">Resumo do Pedido</h2>
        <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-8">
          Seu carrinho está vazio
        </div>
        <div v-else>
          <div class="space-y-3">
            <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-3">
              <img
                :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
                :alt="item.title"
                class="w-12 h-16 object-cover rounded"
              />
              <div class="flex-1">
                <h4 class="text-sm font-medium">{{ item.title }}</h4>
                <div class="text-sm text-gray-500">R$ 19,99</div>
              </div>
              <button @click="removeFromCart(item)" class="text-red-500 hover:text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-6 pt-4 border-t">
            <div class="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>R$ {{ (cartItems.length * 19.99).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <SuccessModal :show="showSuccessModal" :user-name="name" @close="closeSuccessModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import SuccessModal from '../components/SuccessModal.vue'
import { cpfMask, phoneMask, cepMask, isValidEmail, createMaskedInputHandler } from '../utils/masks'

const store = useStore()

const name = ref('')
const email = ref('')
const cpf = ref('')
const phone = ref('')
const cep = ref('')
const address = ref('')
const showSuccessModal = ref(false)

const cartItems = computed(() => store.state.cart)

// Create masked input handlers
const handleCpfInput = createMaskedInputHandler(cpfMask, (value) => (cpf.value = value))
const handlePhoneInput = createMaskedInputHandler(phoneMask, (value) => (phone.value = value))
const handleCepInput = createMaskedInputHandler(cepMask, (value) => (cep.value = value))

const isFormValid = computed(() => {
  return (
    name.value.trim() &&
    email.value.trim() &&
    isValidEmail(email.value) &&
    cpf.value.length === 14 && // XXX.XXX.XXX-XX
    phone.value.length >= 14 && // (XX) XXXXX-XXXX
    cep.value.length === 9 && // XXXXX-XXX
    address.value.trim()
  )
})

const removeFromCart = (item) => {
  store.commit('removeFromCart', item.id)
}

const submitOrder = () => {
  store.commit('CLEAR_CART')
  showSuccessModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>
