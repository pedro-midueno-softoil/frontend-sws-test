<template>
  <section class="w-full h-[100vh]">
    <q-bar class="h-[70px] flex justify-between bg-[#e85d04]">

      <article class="flex items-center gap-8">
        <span class="cursor-pointer text-white font-bold" @click="navigate('/')">Inicio</span>
        <span class="cursor-pointer text-white font-bold" @click="navigate('/users')">Usuarios</span>
      </article>

      <article class="flex items-center gap-8">
        <span class="text-white font-bold">Bienvenido: {{ user?.name }}</span>
        <q-btn @click="logoutFromComponent" class="bg-blue-500 text-white w-[40px]">
          <q-tooltip>Cerrar sesión</q-tooltip>
          <q-icon name="fa-solid fa-right-from-bracket"></q-icon>
        </q-btn>
      </article>

    </q-bar>
    <slot />
  </section>
</template>

<script setup>
const router = useRouter()
const store = useUsersStore()

const { user } = storeToRefs(store) // para traer propiedades del state
const { logout } = store // traer actions del store

const navigate = (path) => {
  router.push(path)
}

const logoutFromComponent = () => {
  logout()
  navigate('/login')
}
</script>
