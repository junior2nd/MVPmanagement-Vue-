<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          เข้าสู่ระบบ
        </button>
      </form>

      <p v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: false
})

const username = ref("admin");
const password = ref("admin123");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  error.value = "";
  try {
    const response = await $fetch("/api/login", {
      baseURL: "http://localhost:3001",
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
    });

    if (response?.token) {
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } else {
      error.value = "เข้าสู่ระบบไม่สำเร็จ";
    }
  } catch (error) {
    error.value = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
};
</script>
