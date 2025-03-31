<template>
  <ClientOnly>
    <div class="flex-1 p-3 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex justify-between">
          <h1 class="text-2xl font-bold text-gray-800">MovieReport</h1>

          <div class="flex space-x-2">
            <div class="">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by title..."
                class="w-full sm:w-64 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <NuxtLink
              to="/movies/add"
              class=" bg-sky-600 text-white p-2  rounded-lg shadow hover:bg-sky-700"
              >Add Movie</NuxtLink
            >
          </div>
        </div>

        <table
          class="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <thead>
            <tr
              class="bg-gray-100 text-left text-sm font-semibold rounded-xl text-gray-600"
            >
              <th class="px-4 py-2 border-b">ID</th>
              <th class="px-4 py-2 border-b">Title</th>
              <th class="px-4 py-2 border-b">Studio</th>
              <th class="px-4 py-2 border-b">GBO</th>
              <th class="px-4 py-2 border-b">ADMS</th>
              <th class="px-4 py-2 border-b">Remark</th>
              <th class="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="movie in filteredMovies"
              :key="movie.title"
              class="text-sm text-gray-700 hover:bg-gray-50"
            >
              <td class="px-4 py-2 border-b">{{ movie.ID }}</td>
              <td class="px-4 py-2 border-b">{{ movie.Title }}</td>
              <td class="px-4 py-2 border-b">{{ movie.Studio.Name }}</td>
              <td class="px-4 py-2 border-b">{{ movie.GBO }}</td>
              <td class="px-4 py-2 border-b">{{ movie.ADMS }}</td>
              <td class="px-4 py-2 border-b">{{ movie.Remark }}</td>
              <td class="px-4 py-2 border-b space-x-2">
                <NuxtLink :to="`/movies/edit/${movie.ID}`">edit</NuxtLink>
                <button @click="showDeleteDialog(movie)" class="text-red-600 hover:underline">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <DeleteConfirm
          :show="confirmDelete"
          @cancel="confirmDelete = false"
          @confirm="deleteMovie"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DeleteConfirm from "~/components/DeleteConfirm.vue"

const movies = ref([]);
const searchQuery = ref("");
const confirmDelete = ref(false)
const deleteTarget = ref(null)

const filteredMovies = computed(() => {
  if (!searchQuery.value) return movies.value;
  return movies.value.filter((movie) =>
    movie.Title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const showDeleteDialog = (movie) => {
  deleteTarget.value = movie
  confirmDelete.value = true
}

const deleteMovie = async () => {
  try {
    await $fetch(`http://localhost:3001/api/auth/movies/${deleteTarget.value.ID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    movies.value = movies.value.filter((m) => m.ID !== deleteTarget.value.ID)
    confirmDelete.value = false
  } catch (error) {
    console.error("Failed to delete movie:", error)
  }
}

onMounted(async () => {
  try {
    const data = await $fetch("http://localhost:3001/api/movies");
    movies.value = data;
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
});
</script>

<style lang="scss" scoped></style>
