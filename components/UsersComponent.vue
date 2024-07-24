<template>
  <section class="p-8">

    <div class="mb-4">
      <q-btn class="rounded-full bg-blue-500 text-white w-[40px] h-[40px]" @click="openUserFormDialog()">
        <q-icon name="fa-solid fa-plus"></q-icon>
        <q-tooltip>Crear nuevo usuario</q-tooltip>
      </q-btn>
    </div>

    <q-table :columns="columns" :rows="rows" class="bg-blue-500">
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="actions" :props="props">

            <div v-if="user?.name !== props.row.name" class="w-full flex gap-4 justify-center">
              <q-btn class="w-[30px] h-[30px] bg-blue-500" @click="openUserFormDialog(props.row.id)">
                <q-icon color="white" size="xs" name="fa-solid fa-pen"></q-icon>
                <q-tooltip>Editar</q-tooltip>
              </q-btn>

              <q-btn class="w-[30px] h-[30px] bg-red-500" @click="confirmDelete(props.row.id)">
                <q-icon color="white" size="xs" name="fa-solid fa-trash"></q-icon>
                <q-tooltip>Eliminar</q-tooltip>
              </q-btn>
            </div>

            <div v-else>Eres tú</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <dialogs-user-form ref="userFormDialog" @update-users="getUsers"></dialogs-user-form>
    <dialogs-confirm-dialog ref="confirmDialog" @confirm="deleteUserFromComponent"></dialogs-confirm-dialog>
  </section>
</template>

<script setup>
import { columns } from '~/helpers/users'

const userFormDialog = ref(null)
const confirmDialog = ref(null)
const store = useUsersStore()
const { getAllUsers, deleteUser } = store
const { user } = storeToRefs(store)
const rows = ref([])

const getUsers = async () => {
  try {
    const users = await getAllUsers()
    rows.value = users
  } catch (error) {
    showNotify({
      icon: 'report_problem',
      color: 'red-5',
      message: 'Hubo un error al traer la información de los usuarios',
      textColor: 'white'
    })
  }
}

const confirmDelete = (id) => {
  confirmDialog.value.open('¿Desea eliminar este usuario?', id)
}

const deleteUserFromComponent = async (id) => {
  try {
    await deleteUser(id)
    showNotify({
      message: 'Usuario eliminado correctamente',
      color: 'green',
      icon: 'fa-solid fa-circle-check',
      textColor: 'white'
    })
    await getUsers()
  } catch (error) {
    showNotify({
      icon: 'report_problem',
      color: 'red-5',
      message: 'No se pudo eliminar el usuario, intente más tarde',
      textColor: 'white'
    })
  }
}

const openUserFormDialog = (id) => {
  userFormDialog.value.open(id)
}

onBeforeMount(async () => {
  await getUsers()
})
</script>

<style>
thead tr:first-child th {
  background: #3b82f6;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

table tbody {
  background: white;
}
</style>
