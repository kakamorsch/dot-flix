<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden relative">
    <img
      class="w-full h-64 object-cover"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
    />
    <button
      @click="toggleFavorite"
      class="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        :class="isFavorite ? 'fill-current' : 'text-gray-400'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
    <div class="p-4">
      <h3 class="text-lg font-bold">{{ movie.title }}</h3>
      <p class="text-gray-600">{{ movie.overview }}</p>
      <div class="flex justify-between items-center mt-4">
        <button
          @click="addToCart"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Adicionar ao Carrinho
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

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.commit('removeFromFavorites', props.movie.id)
  } else {
    store.commit('addToFavorites', props.movie)
  }
}

const addToCart = () => {
  store.commit('addToCart', props.movie)
}
</script>
