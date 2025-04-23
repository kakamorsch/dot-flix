<template>
  <aside
    class="fixed top-0 right-0 h-screen w-80 bg-white shadow-lg transform transition-transform duration-300"
    style="margin-top: 80px; height: calc(100vh - 80px)"
  >
    <!-- Header -->
    <div class="p-4 border-b flex justify-between items-center">
      <h2 class="text-lg font-semibold">
        {{ content === 'cart' ? 'Meu Carrinho' : 'Meus Favoritos' }}
      </h2>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 group relative">
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span
          class="absolute -bottom-8 right-0 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
        >
          Fechar
        </span>
      </button>
    </div>

    <!-- Content with Scroll -->
    <div class="overflow-y-auto h-full pb-20">
      <!-- Cart Content -->
      <div v-if="content === 'cart'" class="p-4">
        <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-8">
          Seu carrinho está vazio
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex gap-3 bg-gray-50 p-3 rounded-lg"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
              :alt="item.title"
              class="w-16 h-24 object-cover rounded"
            />
            <div class="flex-1">
              <h3 class="font-medium">{{ item.title }}</h3>
              <p class="text-sm text-gray-600 mt-1">R$ 19,99</p>
            </div>
            <button
              @click="removeFromCart(item)"
              class="text-red-500 hover:text-red-700 self-start group relative"
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
          <div class="mt-6 pt-4 border-t">
            <div class="flex justify-between items-center mb-4">
              <span class="font-semibold">Total:</span>
              <span class="text-lg font-bold">R$ {{ (cartItems.length * 19.99).toFixed(2) }}</span>
            </div>
            <router-link
              to="/checkout"
              class="block w-full bg-indigo-600 text-white text-center px-4 py-2 rounded hover:bg-indigo-700 transition"
              @click="$emit('close')"
            >
              Finalizar Compra
            </router-link>
          </div>
        </div>
      </div>

      <!-- Favorites Content -->
      <div v-else class="p-4">
        <div v-if="favoriteMovies.length === 0" class="text-gray-500 text-center py-8">
          Você ainda não tem favoritos
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="movie in favoriteMovies"
            :key="movie.id"
            class="flex gap-3 bg-gray-50 p-3 rounded-lg"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-16 h-24 object-cover rounded"
            />
            <div class="flex-1">
              <h3 class="font-medium">{{ movie.title }}</h3>
              <div class="flex gap-2 mt-2">
                <button
                  @click="addToCart(movie)"
                  class="text-gray-600 hover:text-green-600 transition-colors group relative"
                  :disabled="isInCart(movie.id)"
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
                    {{ isInCart(movie.id) ? 'Já está no carrinho' : 'Adicionar ao carrinho' }}
                  </span>
                </button>
                <button
                  @click="removeFromFavorites(movie)"
                  class="text-red-500 hover:text-red-700 group relative"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  content: {
    type: String,
    required: true,
    validator: (value) => ['cart', 'favorites'].includes(value),
  },
})

defineEmits(['close'])

const store = useStore()

const cartItems = computed(() => store.state.cart)
const favoriteMovies = computed(() => store.state.favorites)

const removeFromCart = (item) => {
  store.commit('removeFromCart', item.id)
}

const removeFromFavorites = (movie) => {
  store.commit('removeFromFavorites', movie.id)
}

const addToCart = (movie) => {
  if (!isInCart(movie.id)) {
    store.commit('addToCart', movie)
  }
}

const isInCart = (movieId) => {
  return cartItems.value.some((item) => item.id === movieId)
}
</script>
