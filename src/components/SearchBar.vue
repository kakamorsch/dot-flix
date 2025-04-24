<template>
  <div class="w-full py-4 px-6">
    <div class="max-w-5xl mx-auto flex items-center gap-4">
      <router-link
        to="/"
        class="text-indigo-600 hover:text-indigo-700 transition group relative flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <span
          class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
        >
          Página inicial
        </span>
      </router-link>

      <div class="flex-1 relative">
        <input
          type="text"
          placeholder="Buscar filmes..."
          v-model="searchTerm"
          @input="debouncedInput"
          class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div class="relative flex-shrink-0">
        <button
          @click="$emit('toggle-sidebar', 'cart')"
          class="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition group relative"
          :class="{ 'text-indigo-600': showSidebar && sidebarContent === 'cart' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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
            class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
          >
            Carrinho
          </span>
        </button>
        <div
          v-if="cartItemsCount > 0"
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
        >
          {{ cartItemsCount }}
        </div>
      </div>

      <div class="relative flex-shrink-0">
        <button
          @click="$emit('toggle-sidebar', 'favorites')"
          class="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition group relative"
          :class="{ 'text-indigo-600': showSidebar && sidebarContent === 'favorites' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span
            class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
          >
            Favoritos
          </span>
        </button>
        <div
          v-if="favoritesCount > 0"
          class="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
        >
          {{ favoritesCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

defineProps({
  showSidebar: {
    type: Boolean,
    required: true,
  },
  sidebarContent: {
    type: String,
    required: true,
  },
})

defineEmits(['toggle-sidebar'])

const store = useStore()
const searchTerm = ref('')
const router = useRouter()
let debounceTimeout = null

const cartItemsCount = computed(() => store.state.cart.length)
const favoritesCount = computed(() => store.state.favorites.length)

const debouncedInput = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    router.push({ path: '/', query: { q: searchTerm.value } })
  }, 300) // 300ms de debounce
}
</script>
