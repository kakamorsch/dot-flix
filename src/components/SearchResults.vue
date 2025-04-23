<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Resultados da Busca</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-if="!movies.length && !isLoading" class="text-gray-500 mt-4">
      Nenhum filme encontrado para "{{ searchQuery }}".
    </div>
    <div ref="sentinel" class="h-2" v-show="hasMorePages"></div>
    <div v-if="isLoading" class="text-center p-4">Carregando mais filmes...</div>
    <div v-if="error" class="text-red-500 mt-4">Erro ao carregar filmes: {{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MovieCard from './MovieCard.vue'

const route = useRoute()
const store = useStore()
const movies = ref([])
const searchQuery = ref(route.query.q || '')
const currentPage = ref(1)
const totalPages = ref(1)
const isLoading = ref(false)
const error = ref(null)
const sentinel = ref(null)

let observer = null
const hasMorePages = ref(false)

const fetchMovies = async (page, query) => {
  try {
    isLoading.value = true
    error.value = null
    await store.dispatch('FETCH_MOVIES', { query, page })
    const { results, total_pages } = store.getters.moviesData
    totalPages.value = total_pages
    return results
  } catch (err) {
    error.value = err.message || 'Erro desconhecido ao buscar filmes'
    return []
  } finally {
    isLoading.value = false
  }
}

const loadMovies = async (page = 1, isNewSearch = false) => {
  try {
    const results = await fetchMovies(page, searchQuery.value)

    if (isNewSearch) {
      movies.value = results
    } else {
      movies.value = [
        ...movies.value,
        ...results.filter((movie) => !movies.value.some((existing) => existing.id === movie.id)),
      ]
    }

    hasMorePages.value = currentPage.value < totalPages.value
    await nextTick()
  } catch (err) {
    console.error('Erro no carregamento:', err)
  }
}

const loadMoreMovies = async () => {
  if (isLoading.value || !hasMorePages.value) return
  currentPage.value += 1
  await loadMovies(currentPage.value)
}

onMounted(() => {
  loadMovies(1, true)

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasMorePages.value && !isLoading.value) {
        loadMoreMovies()
      }
    },
    {
      rootMargin: '200px',
      threshold: 0.01,
    },
  )

  watch(
    sentinel,
    (newVal) => {
      if (newVal) {
        observer.observe(newVal)
      }
    },
    { immediate: true },
  )
})

watch(
  () => route.query.q,
  async (newQuery) => {
    searchQuery.value = newQuery || ''
    currentPage.value = 1
    await loadMovies(1, true)
  },
)

onUnmounted(() => {
  observer?.disconnect()
})
</script>
