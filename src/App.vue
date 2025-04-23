<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue'
import SideBar from './components/SideBar.vue'

const sidebarState = ref({
  show: false,
  content: 'cart',
})

const toggleSidebar = (content) => {
  if (sidebarState.value.show && sidebarState.value.content === content) {
    sidebarState.value.show = false
  } else {
    sidebarState.value.show = true
    sidebarState.value.content = content
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Fixed Top Bar -->
    <div class="fixed top-0 left-0 right-0 bg-cyan-50 z-50 shadow-sm">
      <SearchBar
        :show-sidebar="sidebarState.show"
        :sidebar-content="sidebarState.content"
        @toggle-sidebar="toggleSidebar"
      />
    </div>

    <!-- Main Content with padding for top bar -->
    <div class="pt-24">
      <RouterView />
    </div>

    <!-- Sidebar -->
    <SideBar
      v-if="sidebarState.show"
      :content="sidebarState.content"
      @close="sidebarState.show = false"
    />
  </div>
</template>
