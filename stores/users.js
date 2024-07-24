export const useUsersStore = defineStore('users', {
  state: () => ({
    user: {},
    isAuthenticated: false
  }),
  persist: {
    storage: persistedState.sessionStorage
  },
  actions: {
    async login(params) {
      const { $axios } = useNuxtApp()

      const userLoggedIn = await $axios.post('/auth/login', params)

      this.user = userLoggedIn.data
      this.isAuthenticated = true
    },
    async logout() {
      this.isAuthenticated = false
      this.user = {}
    },
    async getAllUsers() {
      const { $axios } = useNuxtApp()

      const users = await $axios.get('/users')

      return users.data
    },
    async updateUserInfo(id, data) {
      const { $axios } = useNuxtApp()

      await $axios.put(`/users/${id}`, data)
    },
    async deleteUser(id) {
      const { $axios } = useNuxtApp()

      await $axios.delete(`users/${id}`)
    },
    async getUserById(id) {
      const { $axios } = useNuxtApp()

      const user = await $axios.get(`/users/${id}`)

      return user.data
    },
    async createUser(data) {
      const { $axios } = useNuxtApp()

      await $axios.post('/users', data)
    }
  }
})