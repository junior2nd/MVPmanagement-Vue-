<template>
    <div class="min-h-screen p-6">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Edit Cinema</h1>
        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Branch</label>
            <select v-model="theaters.BranchID" class="w-full border px-3 py-2 rounded" required>
              <option disabled value="">Select a branch</option>
              <option v-for="branch in branches" :key="branch.ID" :value="branch.ID">
                {{ branch.Name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Cinema</label>
            <input v-model="theaters.Name" type="text" class="w-full border px-3 py-2 rounded" required />
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

const branches = ref({
  
})

const fetchBranches = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await $fetch('http://localhost:3001/api/branches', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    branches.value = data
    console.log(data)
  } catch (error) {
    console.error('Failed to fetch branches:', error)
  }
}

onMounted(fetchBranches)

const theaters = ref({
  Name: '',
  BranchID: '',
})

const fetchCinema = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await $fetch(`http://localhost:3001/api/cinema/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    theaters.value = data
  } catch (error) {
    console.error('Failed to fetch theaters:', error)
  }
}

const submit = async () => {
  try {
    const token = localStorage.getItem('token')
    await $fetch(`http://localhost:3001/api/admin/cinema/${route.params.id}`, {
      method: 'PUT',
      body: theaters.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push('/theater')
  } catch (error) {
    console.error('Failed to update studios:', error)
  }
}

onMounted(fetchCinema)
</script>

<style lang="scss" scoped>

</style>