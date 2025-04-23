<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>

    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative z-10">
      <div class="text-center">
        <div class="mb-6 text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Obrigado {{ userName }}!</h2>
        <p class="text-gray-600 mb-8">Sua compra foi finalizada com sucesso!</p>
        <router-link
          to="/"
          class="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          @click="$emit('close')"
        >
          Ir para loja
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
})

defineEmits(['close'])
</script>
