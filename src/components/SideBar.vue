<template>
  <aside
    class="fixed top-0 right-0 h-screen w-80 bg-white shadow-lg transform transition-transform duration-300"
    style="margin-top: 80px; height: calc(100vh - 80px)"
  >
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

    <div class="overflow-y-auto h-full pb-20">
      <div v-if="content === 'cart'" class="p-4">
        <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-8">
          Seu carrinho está vazio
        </div>
        <div v-else class="space-y-4">
          <MovieItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            context="cart"
            :isInCart="true"
            @remove-from-cart="removeFromCart"
          />
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

      <div v-else class="p-4">
        <div v-if="favoriteMovies.length === 0" class="text-gray-500 text-center py-8">
          Você ainda não tem favoritos
        </div>
        <div v-else class="space-y-4">
          <MovieItem
            v-for="movie in favoriteMovies"
            :key="movie.id"
            :item="movie"
            context="favorites"
            :isInCart="isInCart(movie.id)"
            @add-to-cart="addToCart"
            @remove-from-favorites="removeFromFavorites"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MovieItem from './MovieItem.vue'

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
