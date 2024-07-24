import axios from 'axios'

export default defineNuxtPlugin(() => {

    const axiosInstance = axios.create({
        baseURL: useRuntimeConfig().public.apiBaseUrl
    })

    return {
        provide: {
            axios: axiosInstance
        }
    }
    
})


