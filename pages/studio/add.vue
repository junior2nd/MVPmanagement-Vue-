<template>
    <div class="min-h-screen p-6">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Studio</h1>
        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Name</label>
            <input v-model="movie.Name" type="text" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const movie = ref({
  Name: '',
})

const submit = async () => {
  try {
    const token = localStorage.getItem('token')
    await $fetch('http://localhost:3001/api/admin/studios', {
      method: 'POST',
      body: movie.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push('/studio')
  } catch (error) {
    console.error('Failed to add studio:', error)
  }
}
</script>

<style lang="scss" scoped>

</style>