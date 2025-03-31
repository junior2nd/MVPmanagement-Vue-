<template>
  <ClientOnly>
    <div class="flex-1 p-3 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex justify-between">
          <h1 class="text-2xl font-bold text-gray-800">Branch</h1>
          <NuxtLink
            to="/branch/add"
            class="bg-sky-600 text-white p-2 text-xs rounded-lg shadow hover:bg-sky-700"
            >Add Branch</NuxtLink
          >
        </div>
        <table
          class="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <thead>
            <tr
              class="bg-gray-100 text-left text-sm font-semibold rounded-xl text-gray-600"
            >
              <th class="px-4 py-2 border-b">ID</th>
              <th class="px-4 py-2 border-b">Branch</th>
              <th class="px-4 py-2 border-b">Adress</th>
              <th class="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="branch in branches"
              :key="branch.ID"
              class="text-sm text-gray-700 hover:bg-gray-50"
            >
              <td class="px-4 py-2 border-b">{{ branch.ID }}</td>
              <td class="px-4 py-2 border-b">{{ branch.Name }}</td>
              <td class="px-4 py-2 border-b">{{ branch.Address }}</td>
              <td class="px-4 py-2 border-b space-x-2">
                <NuxtLink :to="`/branch/edit/${branch.ID}`">edit</NuxtLink>
                <button
                  @click="showDeleteDialog(cinema)"
                  class="text-red-600 hover:underline"
                >
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <DeleteConfirm
          :show="confirmDelete"
          @cancel="confirmDelete = false"
          @confirm="deleteCinema"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DeleteConfirm from "~/components/DeleteConfirm.vue";

const branches = ref([]);
const confirmDelete = ref(false);
const deleteTarget = ref(null);

const fetchBranches = async () => {
  try {
    const data = await $fetch("http://localhost:3001/api/branches");
    branches.value = data;
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch cinema:", error);
  }
};
onMounted(fetchBranches);

const showDeleteDialog = (studio) => {
  deleteTarget.value = studio;
  confirmDelete.value = true;
};

const deleteCinema = async () => {
  try {
    await $fetch(
      `http://localhost:3001/api/admin/cinema/${deleteTarget.value.ID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    cinemas.value = cinemas.value.filter((m) => m.ID !== deleteTarget.value.ID);
    confirmDelete.value = false;
  } catch (error) {
    console.error("Failed to delete cinema:", error);
  }
};
</script>

<style lang="scss" scoped></style>
