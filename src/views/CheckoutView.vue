<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Finalizar Compra</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <CheckoutForm @submit="submitOrder" />
      <CheckoutCartSummary :cartItems="cartItems" />
    </div>

    <SuccessModal :show="showSuccessModal" :user-name="name" @close="closeSuccessModal" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import SuccessModal from '../components/SuccessModal.vue'
import CheckoutCartSummary from '../components/CheckoutCartSummary.vue'
import CheckoutForm from '../components/CheckoutForm.vue'

const store = useStore()

const cartItems = computed(() => store.state.cart)

const showSuccessModal = ref(false)

const name = ref('')

const submitOrder = (formData) => {
  if (formData && formData.name) {
    name.value = formData.name
  }
  store.commit('CLEAR_CART')
  showSuccessModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>
