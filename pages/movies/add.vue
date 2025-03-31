<template>
    <div class="min-h-screen p-6">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Movie</h1>
        <form @submit.prevent="submitMovie" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Title</label>
            <input v-model="movie.Title" type="text" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Studio</label>
            <select v-model="movie.StudioID" class="w-full border px-3 py-2 rounded" required>
              <option disabled value="">Select a studio</option>
              <option v-for="studio in studios" :key="studio.ID" :value="studio.ID">
                {{ studio.Name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">GBO</label>
            <input v-model.number="movie.GBO" type="number" step="0.01" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">ADMS</label>
            <input v-model.number="movie.ADMS" type="number" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Remark</label>
            <input v-model="movie.Remark" type="text" class="w-full border px-3 py-2 rounded" />
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const movie = ref({
  Title: '',
  StudioID: null,
  GBO: null,
  ADMS: null,
  Remark: ''
})

const studios = ref([])

const fetchStudios = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await $fetch('http://localhost:3001/api/studios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    studios.value = data
  } catch (error) {
    console.error('Failed to fetch studios:', error)
  }
}

onMounted(fetchStudios)

const submitMovie = async () => {
  try {
    const token = localStorage.getItem('token')
    await $fetch('http://localhost:3001/api/auth/movies', {
      method: 'POST',
      body: movie.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push('/movies')
  } catch (error) {
    console.error('Failed to add movie:', error)
  }
}
</script>

<style lang="scss" scoped>

</style>