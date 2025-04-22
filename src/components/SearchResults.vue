<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Resultados da Busca</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-if="!movies.length" class="text-gray-500 mt-4">
      Nenhum filme encontrado para "{{ searchQuery }}".
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MovieCard from './MovieCard.vue'

const route = useRoute()
const store = useStore()
const movies = ref([])
const searchQuery = route.query.q || ''

onMounted(async () => {
  try {
    await store.dispatch('FETCH_MOVIES', searchQuery)
    movies.value = store.getters.movies
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
})
</script>
