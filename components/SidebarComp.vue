<template>
    <div :class="['transition-all duration-300', isCollapsed ? 'w-20' : 'w-64', 'bg-white shadow-lg h-screen p-6 flex flex-col']">
      <h2 class="text-xl font-bold mb-6 text-blue-600">
        {{ isCollapsed ? 'MVP' : 'MVP Management' }}
      </h2>
      <button @click="toggleSidebar" class="mb-4 text-gray-500 hover:text-gray-800">
        {{ isCollapsed ? '▶' : '◀' }}
      </button>
      <nav class="flex-1 space-y-3">
        <div class="space-y-2">
          <!-- <div class="text-xs text-gray-500 uppercase font-bold tracking-wide bg-gray-200 p-2 rounded-xl text-center">{{ isCollapsed ? '—' : 'Main' }}</div> -->
          <NuxtLink to="/dashboard" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
            <House class="w-5 h-5" />
            <span v-if="!isCollapsed">Dashboard</span>
          </NuxtLink>
          <NuxtLink to="/movies" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
            <Clapperboard class="w-5 h-5" />
            <span v-if="!isCollapsed">Movies</span>
          </NuxtLink>
        </div>
        <hr class="my-4" />
        <div class="space-y-3">
          <!-- <div class="text-xs text-gray-500 uppercase font-bold tracking-wide bg-gray-200 p-2 rounded-xl text-center">{{ isCollapsed ? '—' : 'Cinema Management' }}</div> -->
          <NuxtLink to="/studio" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
            <Building2 class="w-5 h-5" />
            <span v-if="!isCollapsed">Studio</span>
          </NuxtLink>
          <NuxtLink to="/theater" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
            <Landmark class="w-5 h-5" />
            <span v-if="!isCollapsed">Theater</span>
          </NuxtLink>
        </div>
        <hr class="my-4" />
        <div v-if="userRole !== ''" class="space-y-3">
          <!-- <div class="text-xs text-gray-500 uppercase font-bold tracking-wide bg-gray-200 p-2 rounded-xl text-center">{{ isCollapsed ? '—' : 'Admin' }}</div> -->
          <NuxtLink to="/users" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
            <Users class="w-5 h-5" />
            <span v-if="!isCollapsed">Users</span>
          </NuxtLink>
          <NuxtLink to="/branch" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
            <Network class="w-5 h-5" />
            <span v-if="!isCollapsed">Branch</span>
          </NuxtLink>
        </div>
        <hr class="my-4" />
        <button class="flex items-center gap-2 block text-left w-full text-red-600 hover:text-red-800 font-medium mt-4" @click="logout">
          <LogOut class="w-5 h-5" />
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </nav>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { House,Clapperboard,Building2,Landmark,Users,Network,LogOut } from 'lucide-vue-next'

const router = useRouter()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed.value))
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const userRole = (() => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role
  } catch (e) {
    return null
  }
})()

onMounted(() => {
  const stored = localStorage.getItem('sidebar-collapsed')
  if (stored !== null) {
    isCollapsed.value = JSON.parse(stored)
  }
})
</script>

<style lang="scss" scoped>

</style>