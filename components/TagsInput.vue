<template>
  <div class="my-4">
    <TagsInputRoot
      v-model="allTags"
      class="flex gap-2 items-center border p-2 rounded-lg w-full max-w-[480px] flex-wrap border-gray-800 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
    >
      <TagsInputItem v-for="tag in allTags" :key="tag" :value="tag.toLowerCase()" class="text-white flex shadow-md items-center justify-center gap-2 bg-emerald-600 aria-[current=true]:bg-emerald-900 rounded p-1">
        <TagsInputItemText class="text-sm pl-1" />

        <TagsInputItemDelete class="flex items-center p-0.5 rounded bg-transparent hover:bg-blackA4">
          <UIcon name="i-mdi-close" />
        </TagsInputItemDelete>
      </TagsInputItem>

      <TagsInputInput placeholder="Tags..." class="text-sm focus:outline-none flex-1 rounded text-white bg-transparent placeholder:text-gray-300 px-1" />
    </TagsInputRoot>
  </div>
</template>

<script setup>
import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'radix-vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'unknown',
  },
})

const tags = defineModel({ type: Array, default: [] })
const allTags = computed(() => [props.tag, ...tags.value])
</script>
