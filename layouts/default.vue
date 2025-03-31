<template>
  <ClientOnly>
    <div class="h-screen flex bg-gray-50 overflow-hidden">
      <SidebarComp />
      <div class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-7xl mx-auto">
          <NuxtPage />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
