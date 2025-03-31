<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Movie Details</h1>
    <div v-if="movie">
      <div class="grid grid-cols-5 gap-4 border items-center p-2">
        <div class="items-center text-center">image</div>
        <div class="col-span-2">
          <p><strong>Title:</strong> {{ movie.Title }}</p>
          <p><strong>Studio:</strong> {{ movie.Studio?.Name }}</p>
          <p><strong>Status:</strong> {{ movie.MovieStatus?.Name }}</p>
          <p><strong>Remark:</strong> {{ movie.Remark }}</p>
        </div>
        <div class="text-center">
          <p><strong>GBO</strong></p>
          <p class="text-6xl">{{ movie.GBO }}</p>
        </div>
        <div class="text-center">
          <p><strong>ADMS</strong></p>
          <p class="text-6xl">{{ movie.ADMS }}</p>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex justify-between items-center">
          <div class="flex">
            <h2 class="text-xl font-bold mb-4">Sessions</h2>
          </div>
          <div>
            <NuxtLink
              :to="`/movies/session/add?id=${movie.ID}`"
              class="bg-sky-600 text-xs text-white p-2 rounded-lg shadow hover:bg-sky-700"
              >Add Session</NuxtLink
            >
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-center border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th class="px-3 py-2 border">No.</th>
                <th class="px-3 py-2 border">Title</th>
                <th class="px-3 py-2 border">Theatre</th>
                <th class="px-3 py-2 border">Date</th>
                <th class="px-3 py-2 border">Screen</th>
                <th class="px-3 py-2 border">Session</th>
                <th class="px-3 py-2 border">Group Booking</th>
                <th class="px-3 py-2 border">Total Screen</th>
                <th class="px-3 py-2 border">Total Session</th>
                <th class="px-3 py-2 border">System Type</th>
                <th class="px-3 py-2 border">GBO</th>
                <th class="px-3 py-2 border">ADMS</th>
                <th class="px-3 py-2 border">Status</th>
                <th class="px-3 py-2 border">Remark</th>
                <th class="px-3 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(session, index) in sessions" :key="session.ID">
                <td class="px-3 py-2 border">{{ index + 1 }}</td>
                <td class="px-3 py-2 border">{{ session.Movie.Title }}</td>
                <td class="px-3 py-2 border">
                  {{ session.Cinema?.Branch.Name }}
                </td>
                <td class="px-3 py-2 border">{{ session.ShowDate }}</td>
                <td class="px-3 py-2 border">{{ session.Cinema?.Name }}</td>
                <td class="px-3 py-2 border">
                  {{ session.ShowTime }}
                </td>
                <td class="px-3 py-2 border">
                  {{ session.GroupBooking ? "Yes" : "No" }}
                </td>
                <td class="px-3 py-2 border">{{ session.TotalScreen }}</td>
                <td class="px-3 py-2 border">{{ session.TotalSession }}</td>
                <td class="px-3 py-2 border">{{ session.SystemType?.Name }}</td>
                <td class="px-3 py-2 border">{{ session.GBO }}</td>
                <td class="px-3 py-2 border">{{ session.ADMS }}</td>
                <td class="px-3 py-2 border ">
                  <p
                    :class="[
                      'px-2 rounded-xl',
                      session.StatusConfirmed ? 'bg-green-300 text-green-900' : 'bg-gray-300'
                    ]"
                  >
                    {{ session.StatusConfirmed ? "Complete" : "Draft" }}
                  </p>
                </td>
                <td class="px-3 py-2 border">{{ session.Remark }}</td>
                <td class="px-3 py-2 border">
                  <div class="flex space-x-2">
                    <NuxtLink :to="`session/edit/${movie.ID}`"
                      ><Pencil class="w-4 h-4 hover:text-green-600"
                    /></NuxtLink>
                    <button
                      @click="showDeleteDialog(sessions)"
                      class="hover:text-red-600"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <DeleteConfirm
            :show="confirmDelete"
            @cancel="confirmDelete = false"
            @confirm="deleteSession"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Pencil, Trash2 } from "lucide-vue-next";

const route = useRoute();
const movie = ref(null);
const sessions = ref([]);
const confirmDelete = ref(false);
const deleteTarget = ref(null);

const fetchMovie = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await $fetch(
      `http://localhost:3001/api/movies/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    movie.value = data;
  } catch (error) {
    console.error("Failed to load movie:", error);
  }
};

const fetchSessions = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await $fetch(
      `http://localhost:3001/api/auth/movies/${route.params.id}/sessions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    sessions.value = data;
    console.log(data);
  } catch (error) {
    console.error("Failed to load sessions:", error);
  }
};

const showDeleteDialog = (sessions) => {
  deleteTarget.value = sessions;
  confirmDelete.value = true;
};

const deleteSession = async () => {
  try {
    await $fetch(
      `http://localhost:3001/api/auth/session/${deleteTarget.value.ID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    movies.value = movies.value.filter((m) => m.ID !== deleteTarget.value.ID);
    confirmDelete.value = false;
  } catch (error) {
    console.error("Failed to delete movie:", error);
  }
};

onMounted(() => {
  fetchMovie();
  fetchSessions();
});
</script>
