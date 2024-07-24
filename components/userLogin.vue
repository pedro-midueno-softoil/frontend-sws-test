<template>
  <section class="h-[100vh] flex justify-center items-center">
    <q-card class="p-4" style="width: 50vw;">
      <q-card-section class="flex flex-col gap-4">

        <q-input v-model="user" outlined label="Usuario"></q-input>

        <q-input v-model="password" :type="isPassword ? 'password' : 'text'" outlined label="Contraseña">
          <template #append>
            <q-icon :name="isPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
              @click="isPassword = !isPassword"></q-icon>
          </template>
        </q-input>

      </q-card-section>
      <q-card-actions>
        <q-btn class="bg-[#fb8500] text-white" @click="clearInputs">Limpiar</q-btn>
        <q-btn class="bg-blue-500 text-white" @click="loginFromComponent">Enviar</q-btn>
      </q-card-actions>
    </q-card>
  </section>
</template>

<script setup>
const user = ref('')
const password = ref('')
const isPassword = ref(true)

const store = useUsersStore()
const { login } = store

const router = useRouter()

const clearInputs = () => {
  user.value = ''
  password.value = ''
}

const loginFromComponent = async () => {
  try {
    await login({
      email: user.value,
      password: password.value
    })

    router.push('/')
  } catch (error) {
    showNotify({
      icon: 'report_problem',
      color: 'red-5',
      message: 'Usuario o contraseña incorrectos',
      textColor: 'white'
    })
  }
}
</script>
