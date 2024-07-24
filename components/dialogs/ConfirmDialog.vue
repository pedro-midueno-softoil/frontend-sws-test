<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 40vw; width: 40vw;">
      <q-bar class="bg-blue-500 text-white">
        Confirmar
        <q-space />

        <q-btn dense flat icon="fa-solid fa-times" v-close-popup>
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="flex flex-col gap-4">

        <article class="w-full flex justify-center items-center text-lg font-bold">
          {{ message }}
        </article>

        <article class="w-full flex justify-center items-center gap-4">
          <q-btn class="text-white bg-red-500" v-close-popup>Cancelar</q-btn>
          <q-btn class="text-white bg-blue-500" @click="confirm">Confirmar</q-btn>
        </article>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const store = useUsersStore()
const showDialog = ref(false)
const message = ref('')
const paramsRef = ref(null)
const emit = defineEmits(['confirm'])

const open = async (confirmMessage = '¿Desea realizar esta operación?', params) => {
  message.value = confirmMessage
  paramsRef.value = params
  showDialog.value = true
}

const confirm = () => {
  emit('confirm', paramsRef.value)
  showDialog.value = false
}

defineExpose({
  open
})
</script>