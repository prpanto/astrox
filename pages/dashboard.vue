<template >
  <NuxtLayout name="default" v-slot="{ repos, loadingRepos }">
    <UDashboardPage>
      <UDashboardPanel :width="400">
        <UDashboardNavbar>
          <template #center>
            <UDashboardSearchButton  />
          </template>
        </UDashboardNavbar>

        <ReposList v-model="selectedRepo" :repos="repos" :loading="loadingRepos" />
      </UDashboardPanel>

      <UDashboardPanel grow side="right">
        <template v-if="selectedRepo">
          <UDashboardNavbar>
            <template #toggle>
              <UDashboardNavbarToggle icon="i-heroicons-x-mark" />

              <UDivider orientation="vertical" class="mx-1.5 lg:hidden" />
            </template>

            <template #left>
              <UTabs v-model="selectedTab" :items="tabItems" />
            </template>

            <template #right>
              <UTooltip text="Latest Update" :popper="{ placement: 'left' }">
                <div class="flex items-center mr-2">
                  <span class="text-sm mr-1">Feb 15, 2024</span>
                  <UIcon name="i-mdi-latest" class="flex-shrink-0 size-5" />
                </div>
              </UTooltip>

              <CopyClipboard :text="`git@github.com:${selectedRepo.nameWithOwner}.git`" />
            </template>
          </UDashboardNavbar>

          <Readme v-if="isSelectedTab(0)" :repo="selectedRepo"/>
          <Notes v-if="isSelectedTab(1)" />
        </template>

        <div v-else class="flex-1 hidden lg:flex items-center justify-center">
          <UIcon name="i-heroicons-inbox" class="w-32 h-32 text-gray-400 dark:text-gray-500" />
        </div>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  middleware: [
    'auth',
  ],
})

const tabItems = [
  { label: 'Readme' },
  { label: 'Notes'}
]

const selectedTab = ref(0)
const selectedRepo = ref()

function isSelectedTab(index) {
  return selectedTab.value === index
}
</script>
