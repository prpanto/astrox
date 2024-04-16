<template>
  <UDashboardPanelContent class="p-0">
    <div v-if="loading" class="relative h-full">
      <div class="z-10 sticky top-1/2 flex items-center justify-center space-x-2">
        <UIcon name="i-bi-arrow-repeat" :class="['size-5', loading ? 'animate-spin' : '']" />
        <span class="text-base font-semibold">Loading Stars...</span>
      </div>

      <div class="-mt-6">
        <div v-for="n in 10" :key="n" class="flex flex-col">
          <div class="flex items-center space-x-4 py-4 px-2">
            <div class="space-y-2">
              <USkeleton class="h-4 w-[250px]" />
              <USkeleton class="h-4 w-[200px]" />
              <USkeleton class="h-4 w-[200px]" />
            </div>
          </div>

          <UDivider />
        </div>
      </div>
    </div>

    <template v-else>
      <div v-for="(group, index) in repos.pages" :key="index">
        <div v-for="repo in group.data" :key="repo.id">
          <div
            :class="[
              'p-4 cursor-pointer border-l-2',
              selectedRepo && selectedRepo.nameWithOwner === repo.nameWithOwner
              ? 'border-primary-500 dark:border-primary-400 bg-primary-100 dark:bg-primary-900/25'
              : 'border-white dark:border-gray-900 hover:border-primary-500/25 dark:hover:border-primary-400/25 hover:bg-primary-100/50 dark:hover:bg-primary-900/10'
            ]"
            @click="setRepo(repo)"
          >
            <div>
                <div class="flex items-center space-x-1">
                <UIcon name="i-mdi-github" class="flex-shrink-0 size-4" />
                <p class="text-sm font-medium">{{ repo.nameWithOwner }}</p>
              </div>
      
              <p v-if="repo.description" class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ removeEmoji(repo.description) }}</p>
            </div>
            
            <TagsInput v-model="tags" :tag="repo.primaryLanguage ? repo.primaryLanguage.name : 'unknown'" />
            
            <div class="mt-2 flex space-x-4">
              <UTooltip text="Stars">
                <div class="flex items-center space-x-1">
                  <UIcon name="i-mdi-star" class="mr-1 flex-shrink-0 size-4 text-gray-500 dark:text-gray-400" />
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ repo.stargazers.totalCount }}</span>
                </div>
              </UTooltip>
              <UTooltip text="Forks">
                <div class="flex items-center space-x-1">
                  <UIcon name="i-lucide-git-fork" class="mr-1 flex-shrink-0 size-4 text-gray-500 dark:text-gray-400" />
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ repo.forkCount }}</span>
                </div>
              </UTooltip>
              <UTooltip v-if="repo.latestRelease" text="Last Update">
                <div class="flex items-center space-x-1">
                  <UIcon name="i-mdi-latest" class="mr-1 flex-shrink-0 size-4 text-gray-500 dark:text-gray-400" />
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ timeAgo(repo.latestRelease.updatedAt) }}</span>
                </div>
              </UTooltip>
            </div>
          </div>
    
          <UDivider />
        </div>
      </div>
    </template>
  </UDashboardPanelContent>
</template>

<script setup>
const props = defineProps({
  repos: {
    type: Object,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const selectedRepo = defineModel({ type: Object, default: {} })

const tags = ref([])

function setRepo(repo) {
  if (!selectedRepo.value || selectedRepo.value.nameWithOwner !== repo.nameWithOwner) {
    selectedRepo.value = repo
  } else {
    selectedRepo.value = null
  }
}
</script>
