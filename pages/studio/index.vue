<template>
  <ClientOnly>
    <div class="flex-1 p-3 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex justify-between">
          <h1 class="text-2xl font-bold text-gray-800">Studio</h1>
          <NuxtLink
            to="/studio/add"
            class="bg-sky-600 text-white p-2 text-xs rounded-lg shadow hover:bg-sky-700"
            >Add Studio</NuxtLink
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
              <th class="px-4 py-2 border-b">Studio</th>
              <th class="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="studio in studios"
              :key="studio.ID"
              class="text-sm text-gray-700 hover:bg-gray-50"
            >
              <td class="px-4 py-2 border-b">{{ studio.ID }}</td>
              <td class="px-4 py-2 border-b">{{ studio.Name }}</td>
              <td class="px-4 py-2 border-b space-x-2">
                <NuxtLink :to="`/studio/edit/${studio.ID}`">edit</NuxtLink>
                <button
                  @click="showDeleteDialog(studio)"
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
          @confirm="deleteStudio"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DeleteConfirm from "~/components/DeleteConfirm.vue";

const studios = ref([]);
const confirmDelete = ref(false);
const deleteTarget = ref(null);

onMounted(async () => {
  try {
    const data = await $fetch("http://localhost:3001/api/studios");
    studios.value = data;
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
});

const showDeleteDialog = (studio) => {
  deleteTarget.value = studio;
  confirmDelete.value = true;
};

const deleteStudio = async () => {
  try {
    await $fetch(
      `http://localhost:3001/api/admin/studios/${deleteTarget.value.ID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    studios.value = studios.value.filter((m) => m.ID !== deleteTarget.value.ID);
    confirmDelete.value = false;
  } catch (error) {
    console.error("Failed to delete studios:", error);
  }
};
</script>

<style lang="scss" scoped></style>
