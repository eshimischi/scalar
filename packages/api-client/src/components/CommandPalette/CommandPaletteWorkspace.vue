<script setup lang="ts">
import { useWorkspace } from '@/store/workspace'
import { ScalarButton } from '@scalar/components'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const emits = defineEmits<{
  (event: 'close'): void
}>()

const { push } = useRouter()
const { workspaceMutators } = useWorkspace()
const workspaceName = ref('')

const handleSubmit = () => {
  const workspace = workspaceMutators.add({
    name: workspaceName.value,
  })
  push(`/workspace/${workspace.uid}`)
  emits('close')
}

const workspaceInput = ref<HTMLInputElement | null>(null)
onMounted(() => {
  workspaceInput.value?.focus()
})
</script>
<template>
  <form
    class="flex w-full flex-col gap-3"
    @submit.prevent="handleSubmit">
    <div
      class="gap-3 rounded bg-b-2 focus-within:bg-b-1 focus-within:shadow-border min-h-20 relative">
      <label
        class="absolute w-full h-full opacity-0 cursor-text"
        for="workspacename"></label>
      <input
        id="workspacename"
        ref="workspaceInput"
        v-model="workspaceName"
        autofocus
        class="border-transparent outline-none w-full pl-8 text-sm min-h-8 py-1.5"
        label="Workspace Name"
        placeholder="Workspace Name" />
    </div>
    <div class="flex">
      <div class="flex flex-1 gap-2 max-h-8"></div>
      <ScalarButton
        class="max-h-8 text-xs p-0 px-3"
        type="submit">
        Continue
      </ScalarButton>
    </div>
  </form>
</template>
