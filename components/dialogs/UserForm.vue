<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 40vw; width: 40vw;">
      <q-bar class="bg-blue-500 text-white">
        {{ title }}
        <q-space />

        <q-btn dense flat icon="fa-solid fa-times" v-close-popup>
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="flex flex-col gap-4">
        <q-input v-model="name" outlined label="Nombre"></q-input>
        <q-input v-model="email" outlined label="Correo"></q-input>
        <q-input v-if="!userId" v-model="password" outlined label="Contraseña"></q-input>
      </q-card-section>

      <q-card-section class="flex justify-end gap-4">
        <q-btn v-close-popup class="bg-red-500 text-white">Cancelar</q-btn>
        <q-btn v-if="userId" class="bg-blue-500 text-white" @click="updateUser()">Actualizar</q-btn>
        <q-btn v-else class="bg-blue-500 text-white" @click="createUserFromComponent"
          :disable="!name || !email || !password">Crear</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const store = useUsersStore()
const showDialog = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const userId = ref(null)
const title = ref('')
const { getUserById, updateUserInfo, createUser } = store
const emit = defineEmits(['update-users'])

const open = async (id = null) => {
  clearInputs()

  if (id) {
    title.value = 'Editar usuario'
    await getUserInfo(id)
  } else {
    title.value = 'Agregar nuevo usuario'
  }

  showDialog.value = true
}

const getUserInfo = async (id) => {
  try {
    const user = await getUserById(id)
    name.value = user.name
    email.value = user.email
    userId.value = user.id
  } catch (error) {
    showNotify({
      icon: 'report_problem',
      color: 'red-5',
      message: 'Hubo un error al traer la información del usuario',
      textColor: 'white'
    })
  }
}

const updateUser = async () => {
  const data = {
    name: name.value,
    email: email.value
  }

  try {
    await updateUserInfo(userId.value, data)
    showNotify({
      message: 'Usuario actualizado correctamente',
      color: 'green',
      icon: 'fa-solid fa-circle-check',
      textColor: 'white'
    })
    emit('update-users')
    showDialog.value = false
  } catch (error) {
    showNotify({
      icon: 'report_problem',
      color: 'red-5',
      message: 'No se pudo actualizar el usuario, intente más tarde',
      textColor: 'white'
    })
  }
}

const createUserFromComponent = async () => {
  const data = {
    email: email.value,
    name: name.value,
    password: password.value
  }

  try {
    await createUser(data)
    showNotify({
      message: 'Usuario creado correctamente',
      color: 'green',
      icon: 'fa-solid fa-circle-check',
      textColor: 'white'
    })
    emit('update-users')
    showDialog.value = false
  } catch (error) {
    showNotify({
      icon: 'report_problem',
      color: 'red-5',
      message: 'No se pudo crear el usuario, intente más tarde',
      textColor: 'white'
    })
  }
}

const clearInputs = () => {
  userId.value = null
  email.value = null
  name.value = null
  password.value = null
}

defineExpose({
  open
})
</script>