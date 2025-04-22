<script setup>
import SearchResults from '@/components/SearchResults.vue'
</script>

<template>
  <div>
    <h1>Bem vindo à Dot Flix</h1>
    <SearchResults :filmes="filmes" />
  </div>
</template>
