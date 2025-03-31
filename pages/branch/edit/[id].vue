<template>
    <div class="min-h-screen p-6">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Edit Branch</h1>
        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Name</label>
            <input v-model="branches.Name" type="text" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Address</label>
            <input v-model="branches.Address" type="text" class="w-full border px-3 py-2 rounded" required />
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
  Name: '',
  Address:'',
})

const fetchBranches = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await $fetch(`http://localhost:3001/api/branches/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    branches.value = data
  } catch (error) {
    console.error('Failed to fetch branches:', error)
  }
}

const submit = async () => {
  try {
    const token = localStorage.getItem('token')
    await $fetch(`http://localhost:3001/api/admin/branches/${route.params.id}`, {
      method: 'PUT',
      body: branches.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push('/branch')
  } catch (error) {
    console.error('Failed to update branches:', error)
  }
}

onMounted(fetchBranches)
</script>

<style lang="scss" scoped>

</style>