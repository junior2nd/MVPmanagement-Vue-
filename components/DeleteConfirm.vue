<template>
    <div
      v-if="show"
      class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
        <p class="mb-2">To confirm, please type <strong>DELETE</strong> below:</p>
        <input
          v-model="inputText"
          class="w-full border px-3 py-2 mb-4 rounded"
          placeholder="Type DELETE here"
        />
        <div class="flex justify-end space-x-2">
          <button @click="onCancel" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            @click="onConfirm"
            :disabled="inputText !== 'DELETE'"
            class="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    show: Boolean
  })
  const emit = defineEmits(['cancel', 'confirm'])
  
  const inputText = ref('')
  
  watch(() => props.show, (newVal) => {
    if (newVal) inputText.value = ''
  })
  
  const onCancel = () => emit('cancel')
  const onConfirm = () => emit('confirm')
  </script>