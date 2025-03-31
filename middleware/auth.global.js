export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server) return

    const token = localStorage.getItem('token')

    // ถ้ายังไม่มี token และไม่ใช่หน้า login → ให้ redirect ไป login
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }

    // ถ้ามี token และพยายามเข้าหน้า login → redirect ไป dashboard
    if (token && to.path === '/login') {
      return navigateTo('/dashboard')
    }
  })