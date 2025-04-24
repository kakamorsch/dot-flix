<template>
  <div class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
    <img
      :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
      :alt="item.title"
      class="w-16 h-24 object-cover rounded"
    />
    <div class="flex-1">
      <h3 class="font-medium">{{ item.title }}</h3>
      <div class="text-sm text-gray-600 mt-1">R$ 19,99</div>
      <div v-if="context === 'favorites'" class="flex gap-2 mt-2">
        <button
          @click="$emit('add-to-cart', item)"
          class="text-gray-600 hover:text-green-600 transition-colors group relative"
          :disabled="isInCart"
          :aria-disabled="isInCart"
          aria-label="Add to cart"
        >
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span
            class="absolute -bottom-8 right-0 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
          >
            {{ isInCart ? 'Já está no carrinho' : 'Adicionar ao carrinho' }}
          </span>
        </button>
        <button
          @click="$emit('remove-from-favorites', item)"
          class="text-red-500 hover:text-red-700 group relative"
          aria-label="Remove from favorites"
        >
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
          <span
            class="absolute -bottom-8 right-0 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
          >
            Remover dos favoritos
          </span>
        </button>
      </div>
      <button
        v-else-if="context === 'cart'"
        @click="$emit('remove-from-cart', item)"
        class="text-red-500 hover:text-red-700 self-start group relative"
        aria-label="Remove from cart"
      >
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
        <span
          class="absolute -bottom-8 right-0 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
        >
          Remover do carrinho
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  context: {
    type: String,
    required: true,
    validator: (value) => ['cart', 'favorites'].includes(value),
  },
  isInCart: {
    type: Boolean,
    default: false,
  },
})
</script>
