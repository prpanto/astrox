<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }" class="w-full"
  >
    <template #default="{ open }">
      <UButton color="gray" variant="ghost" class="w-full" :label="user.name || `@${user.username}`" :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <template #leading>
          <UAvatar :src="user.avatar" size="2xs" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ `@${user.username}` }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>

<script setup>
const { user, clear } = useUserSession()
const router = useRouter()

async function logout() {
  clear()
  await navigateTo('/')
}

const items = computed(() => [
  [
    { slot: 'account' }
  ], 
  [
    { label: 'Settings', icon: 'i-heroicons-cog-8-tooth' },
    { label: 'Logout', icon: 'i-heroicons-arrow-left-on-rectangle', click: () => logout() },
  ]
])

</script>
