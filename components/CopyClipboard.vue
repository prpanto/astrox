<template>
  <UTooltip :closeDelay="copied ? 1500 : 0" >
    <template #text>
      <span v-if="copied" class="text-sm">Is copied!</span>
      <span v-else class="text-sm">Copy</span>
    </template>

    <div class="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-800" @click="copy()">
      <span class="text-sm select-none">{{ props.text }}</span>
    
      <UIcon name="i-heroicons-clipboard" class="flex-shrink-0 size-5" />
    </div>
  </UTooltip>
</template>

<script setup>
const props = defineProps({
  text: String
})

const { text, copy, copied } = useClipboard({ source: props.text })
</script>
