<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden relative w-full">
    <div class="relative">
      <img
        class="w-full h-48 object-cover"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
      />
      <!-- Data de lançamento -->
      <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
        <span class="text-xs font-medium"> Lançamento: {{ formattedReleaseDate }} </span>
      </div>
    </div>

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
    <div>
      <div class="p-3 flex flex-col items-center justify-center">
        <h3 class="text-sm font-semibold truncate">{{ movie.title }}</h3>

        <!-- Exibição dos gêneros -->
        <div class="flex flex-wrap gap-1 my-1">
          <span
            v-for="genre in genres"
            :key="genre"
            class="text-xs px-2 py-1 bg-gray-100 rounded-full"
            :title="genre"
          >
            {{ genre }}
          </span>
        </div>

        <!-- Classificação com estrela -->
        <div class="flex items-center gap-1 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-sm font-medium text-gray-700">
            {{ voteAverage }}
          </span>
        </div>
        <span class="text-sm font-bold">R$ 19,99</span>
      </div>
      <div class="">
        <button
          @click="addToCart"
          class="w-full bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition"
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
import { getGenreName } from '@/enums/genres.enum'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const store = useStore()

const formattedReleaseDate = computed(() => {
  if (!props.movie.release_date) return 'Data não informada'
  const date = new Date(props.movie.release_date)
  return date.toLocaleDateString('pt-BR')
})

const voteAverage = computed(() => {
  return props.movie.vote_average ? `${props.movie.vote_average.toFixed(1)}/10` : 'Não avaliado'
})

const genres = computed(() => {
  return props.movie.genre_ids
    ? props.movie.genre_ids
        .map((id) => getGenreName(id))
        .filter(Boolean)
        .slice(0, 3)
    : []
})

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
    store.commit('addToCart', {
      ...props.movie,
    })
  }
}
</script>
