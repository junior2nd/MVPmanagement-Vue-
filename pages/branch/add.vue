<template>
  <div class="min-h-screen p-6">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Branch</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Name</label>
          <input
            v-model="branches.Name"
            type="text"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Address</label>
          <input
            v-model="branches.Address"
            type="text"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const branches = ref({
  Name: "",
  Address: "",
});

const submit = async () => {
  try {
    const token = localStorage.getItem("token");
    await $fetch("http://localhost:3001/api/admin/branches", {
      method: "POST",
      body: branches.value,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.push("/branch");
  } catch (error) {
    console.error("Failed to add branches:", error);
  }
};
</script>

<style lang="scss" scoped></style>
