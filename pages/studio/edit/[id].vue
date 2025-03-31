<template>
    <div class="min-h-screen p-6">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Edit Studio</h1>
        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Name</label>
            <input v-model="studios.Name" type="text" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const studios = ref({
  Name: '',
})

const fetchMovie = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await $fetch(`http://localhost:3001/api/studios/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    studios.value = data
  } catch (error) {
    console.error('Failed to fetch studios:', error)
  }
}

const submit = async () => {
  try {
    const token = localStorage.getItem('token')
    await $fetch(`http://localhost:3001/api/admin/studios/${route.params.id}`, {
      method: 'PUT',
      body: studios.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push('/studio')
  } catch (error) {
    console.error('Failed to update studios:', error)
  }
}

onMounted(fetchMovie)
</script>

<style lang="scss" scoped>

</style>