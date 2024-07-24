export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUsersStore()

    const unprotectedRoutes = ['/login']

    if(!store.isAuthenticated && !unprotectedRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    if(store.isAuthenticated && to.path === '/login') {
        return navigateTo('/')
    }
})
