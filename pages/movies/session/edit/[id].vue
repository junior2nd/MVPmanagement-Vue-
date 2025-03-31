<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Edit Session</h1>
    <form @submit.prevent="updateSession">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-1">Movie</label>
          <select
            v-model="session.MovieID"
            class="w-full border px-3 py-2 rounded"
            :disabled="!!route.query.id"
          >
            <option v-for="movie in movies" :key="movie.ID" :value="movie.ID">{{ movie.Title }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Branch</label>
          <select v-model="selectedBranchID" class="w-full border px-3 py-2 rounded">
            <option v-for="b in branches" :key="b.ID" :value="b.ID">{{ b.Name }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Cinema</label>
          <select v-model="session.CinemaID" class="w-full border px-3 py-2 rounded">
            <option v-for="cinema in filteredCinemas" :key="cinema.ID" :value="cinema.ID">{{ cinema.Name }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Show Date</label>
          <input v-model="session.ShowDate" type="date" class="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label class="block mb-1">Show Time</label>
          <input v-model="session.ShowTime" type="time" class="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label class="block mb-1">System Type</label>
          <select v-model="session.SystemTypeID" class="w-full border px-3 py-2 rounded">
            <option v-for="sys in systemTypes" :key="sys.ID" :value="sys.ID">{{ sys.Name }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Group Booking</label>
          <select v-model="session.GroupBooking" class="w-full border px-3 py-2 rounded">
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Total Screen</label>
          <input v-model.number="session.TotalScreen" type="number" class="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label class="block mb-1">Total Session</label>
          <input v-model.number="session.TotalSession" type="number" class="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label class="block mb-1">GBO</label>
          <input v-model.number="session.GBO" type="number" class="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label class="block mb-1">ADMS</label>
          <input v-model.number="session.ADMS" type="number" class="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label class="block mb-1">Status</label>
          <select v-model="session.StatusConfirmed" class="w-full border px-3 py-2 rounded">
            <option :value="true">Complete</option>
            <option :value="false">Draft</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block mb-1">Remark</label>
          <textarea v-model="session.Remark" class="w-full border px-3 py-2 rounded"></textarea>
        </div>
      </div>
      <div class="mt-6">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Session
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const session = ref({
  MovieID: null,
  CinemaID: null,
  ShowDate: '',
  ShowTime: '',
  GroupBooking: false,
  StatusConfirmed: false,
  TotalScreen: 1,
  TotalSession: 1,
  SystemTypeID: null,
  GBO: 0,
  ADMS: 0,
  Remark: '',
  StatusConfirmed: false
})

const movies = ref([])
const cinemas = ref([])
const branches = ref([])
const selectedBranchID = ref(null)
const systemTypes = ref([])

const fetchDropdowns = async () => {
  const token = localStorage.getItem('token')
  movies.value = await $fetch('http://localhost:3001/api/movies', { headers: { Authorization: `Bearer ${token}` } })
  branches.value = await $fetch('http://localhost:3001/api/branches', { headers: { Authorization: `Bearer ${token}` } })
  cinemas.value = await $fetch('http://localhost:3001/api/cinema', { headers: { Authorization: `Bearer ${token}` } })
  systemTypes.value = await $fetch('http://localhost:3001/api/system', { headers: { Authorization: `Bearer ${token}` } })
}

const fetchSession = async () => {
  const token = localStorage.getItem('token')
  const data = await $fetch(`http://localhost:3001/api/auth/sessions/${route.params.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  session.value = data
  selectedBranchID.value = data.Cinema?.BranchID || null
}

const filteredCinemas = computed(() => {
  return cinemas.value.filter(c => c.BranchID === selectedBranchID.value)
})

const updateSession = async () => {
  const token = localStorage.getItem('token')
  try {
    await $fetch(`http://localhost:3001/api/auth/sessions/${route.params.id}`, {
      method: 'PUT',
      body: session.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push(`/movies/${session.value.MovieID}`)
  } catch (err) {
    console.error(err)
    alert('Failed to update session')
  }
}

onMounted(() => {
  fetchDropdowns()
  fetchSession()
})
</script>
