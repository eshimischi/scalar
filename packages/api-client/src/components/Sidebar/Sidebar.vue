<script setup lang="ts">
import { useWorkspace } from '@/store/workspace'

defineProps<{ title?: string }>()

const { isReadOnly } = useWorkspace()
</script>
<template>
  <aside class="w-sidebar relative flex flex-col border-r bg-b-1">
    <slot name="header" />
    <div
      v-if="!isReadOnly && title"
      class="xl:min-h-header py-2.5 flex items-center border-b px-4 text-sm">
      <h2 class="font-medium m-0 text-sm">{{ title }}</h2>
    </div>
    <div class="custom-scroll sidebar-height">
      <slot name="content" />
    </div>
    <slot name="button" />
  </aside>
</template>
<style>
.sidebar-height {
  min-height: calc(100% - 50px);
}
</style>
