<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden relative w-full">
    <img
      class="w-full h-48 object-cover"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
    />
    <button
      @click="toggleFavorite"
      class="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        :class="isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
    <div class="p-3">
      <h3 class="text-sm font-semibold truncate">{{ movie.title }}</h3>
      <p class="text-gray-600 text-xs h-8 overflow-hidden">{{ movie.overview }}</p>
      <div class="flex justify-between items-center mt-2">
        <span class="text-sm font-bold">R$ 19,99</span>
        <button
          @click="addToCart"
          class="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition"
          :disabled="isInCart"
          :class="{ 'opacity-50 cursor-not-allowed': isInCart }"
        >
          {{ isInCart ? 'No Carrinho' : 'Adicionar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const store = useStore()

const isFavorite = computed(() => {
  return store.getters.favoriteMovies.some((fav) => fav.id === props.movie.id)
})

const isInCart = computed(() => {
  return store.getters.cartItems.some((item) => item.id === props.movie.id)
})

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.commit('removeFromFavorites', props.movie.id)
  } else {
    store.commit('addToFavorites', props.movie)
  }
}

const addToCart = () => {
  if (!isInCart.value) {
    store.commit('addToCart', props.movie)
  }
}
</script>
