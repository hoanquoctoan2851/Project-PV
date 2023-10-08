import { createRouter, createWebHistory } from 'vue-router'

// Route page white list
export const ROOT_ROUTE = 'home'
export const LOGIN_ROUTE = 'login'

// Route page view
const modules = import.meta.globEager('./modules/*.js')
const routeModuleList = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export const LIST_ROUTES = routeModuleList

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [...LIST_ROUTES]
})

export default router
