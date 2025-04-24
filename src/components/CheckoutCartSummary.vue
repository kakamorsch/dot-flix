<template>
  <div class="bg-gray-50 p-6 rounded-lg">
    <h2 class="text-lg font-semibold mb-4">Resumo do Pedido</h2>
    <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-8">
      Seu carrinho está vazio
    </div>
    <div v-else>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="text-left py-2">Imagem</th>
            <th class="text-left py-2">Nome</th>
            <th class="text-left py-2">Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id" class="border-b border-gray-200">
            <td class="py-2">
              <img
                :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
                :alt="item.title"
                class="w-16 h-24 object-cover rounded"
              />
            </td>
            <td class="py-2">{{ item.title }}</td>
            <td class="py-2">R$ 9,99</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-6 pt-4 border-t">
        <div class="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span>R$ {{ (cartItems.length * 19.99).toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
})
</script>
