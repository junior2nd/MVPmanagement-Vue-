<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Add Session</h1>
    <form @submit.prevent="submitSession">
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

const filteredCinemas = computed(() => {
  return cinemas.value.filter(c => c.BranchID === selectedBranchID.value)
})

const submitSession = async () => {
  const token = localStorage.getItem('token')

  // Ensure ShowTime is string format like "14:00"
  if (session.value.ShowTime instanceof Date) {
    const hours = session.value.ShowTime.getHours().toString().padStart(2, '0')
    const minutes = session.value.ShowTime.getMinutes().toString().padStart(2, '0')
    session.value.ShowTime = `${hours}:${minutes}`
  }

  try {
    await $fetch('http://localhost:3001/api/auth/sessions', {
      method: 'POST',
      body: session.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // alert('Session created successfully')
    router.push(`/movies/${session.value.MovieID}`)
  } catch (err) {
    console.error(err)
    console.log(session.value)
    alert('Failed to create session')
  }
}

onMounted(() => {
  fetchDropdowns()
  const id = route.query.id
  if (id) {
    session.value.MovieID = parseInt(id)
  }
})
</script>
