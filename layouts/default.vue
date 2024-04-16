<template> 
  <UDashboardLayout>
    <UDashboardPanel :width="250" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <div class="flex items-center space-x-2">
            <svg class="size-12" viewBox="0 0 340 172" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g class=" fill-gray-100" fill-rule="nonzero">
                  <path d="M38.5668239,52.5511807 C39.8155466,47.5783775 44.5384656,43.6410281 52.6044271,40.8503454 C60.3818502,38.1591325 70.9286903,36.6387631 83.9522672,36.3306827 C88.0532409,36.2339759 95.3799089,36.2595341 101.330842,36.4052851 C91.29067,50.4505703 85.3811538,67.6533333 85.3811538,86.239004 C85.3811538,89.5809157 85.5730526,92.8772369 85.9444251,96.118988 C80.5788522,93.5631647 75.5501377,90.958988 70.896247,88.3168193 C59.5652449,81.883743 50.9905445,75.5542811 45.4082227,69.502506 C39.6188158,63.2269237 37.3174109,57.5239839 38.5668239,52.5511807 L38.5668239,52.5511807 Z M241.411433,135.21894 C251.085065,121.333912 256.758504,104.450281 256.758504,86.239004 C256.758504,82.5800321 256.52864,78.9756305 256.084787,75.4375422 C261.370978,78.0728032 267.815464,81.4340562 271.415982,83.4787149 C282.746294,89.9111004 291.321684,96.241253 296.903316,102.292337 C302.692032,108.567229 304.994128,114.270859 303.745405,119.244353 C302.495992,124.217157 297.773073,128.153124 289.707111,130.944498 C281.928998,133.635711 271.382848,135.15608 258.359271,135.46347 C253.009575,135.59057 247.34718,135.506297 241.411433,135.21894 L241.411433,135.21894 Z M9.15591903,68.6107309 C16.2996619,76.3576386 27.2786194,84.4623614 41.7863057,92.7017831 C55.7321012,100.620691 72.2057146,108.248787 90.4271255,115.293189 C102.322779,148.350345 133.937759,171.987566 171.070174,171.987566 C187.048854,171.987566 202.005915,167.60951 214.809291,159.989703 C214.809291,159.989703 172.0842,152.901092 148.784374,134.172434 C151.969342,135.026217 155.176399,135.859968 158.403474,136.670924 C203.763377,148.079566 247.635719,153.91306 281.937972,153.099341 C298.614528,152.705606 312.118543,150.757655 322.07381,147.310056 C332.366626,143.7471 338.391419,138.732161 339.981142,132.404771 C341.569484,126.078072 338.630257,118.808482 331.243534,110.798394 C324.099101,103.052177 313.121524,94.9467631 298.613148,86.7073414 C286.991536,80.1084819 269.737903,72.1868112 254.328016,65.8739277 C245.192806,28.3475341 211.382034,0.49113253 171.070174,0.49113253 C145.97147,0.49113253 123.39299,11.2898313 107.721486,28.4974297 C96.2517368,27.6857831 71.5982652,25.9975582 58.4607915,26.3090924 C41.7849251,26.7048996 28.2816012,28.6528514 18.3256437,32.0990683 C8.03282794,35.6620241 2.00803441,40.6776546 0.418311741,47.0043534 C-1.17003036,53.331743 1.76919636,60.6006426 9.15591903,68.6107309 L9.15591903,68.6107309 Z" id="Fill-22"></path>
                  <path d="M69.5343178,138.893108 C69.5343178,146.614458 63.2796599,152.874153 55.5643623,152.874153 C47.8483745,152.874153 41.5937166,146.614458 41.5937166,138.893108 C41.5937166,131.17245 47.8483745,124.912755 55.5643623,124.912755 C63.2796599,124.912755 69.5343178,131.17245 69.5343178,138.893108" id="Fill-24"></path>
                  <path d="M287.204144,44.3684016 C287.204144,49.005494 283.447621,52.7653173 278.813059,52.7653173 C274.179877,52.7653173 270.422664,49.005494 270.422664,44.3684016 C270.422664,39.732 274.179877,35.9721767 278.813059,35.9721767 C283.447621,35.9721767 287.204144,39.732 287.204144,44.3684016" id="Fill-25"></path>
                  <path d="M88.1222692,152.879679 C88.1222692,155.747727 85.798085,158.073526 82.9306478,158.073526 C80.0632105,158.073526 77.7390263,155.747727 77.7390263,152.879679 C77.7390263,150.010249 80.0632105,147.683759 82.9306478,147.683759 C85.798085,147.683759 88.1222692,150.010249 88.1222692,152.879679" id="Fill-26"></path>
                </g>
              </g>
            </svg>

            <span class="text-gray-100 text-xl font-nasa">Astrox</span>
          </div>
        </template>

        <template #right>
          <!-- Todo: reset stars from github account -->
          <UTooltip text="Reload Stars">
            <button @click="refetchRepos">
              <UIcon name="i-bi-arrow-repeat" :class="['size-5', loadingRepos ? 'animate-spin' : '']" />
            </button>
          </UTooltip>
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="sidebarItems" />
        <UDivider />
        <DashboardSidebarTags :loading="loadingReposTags" :tags="tags" @update:tags="t => tags = t" @added:tag="tag => newTag = tag" />

        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot
      :repos="infinityRepos"
      :loading-repos="loadingRepos"
      :is-fetching="isFetching"
      :has-next-page="hasNextPage"
      :fetch-next-page="fetchNextPage"
      :is-fetching-next-page="isFetchingNextPage"
      :is-error="isError"
      :error="error"
    />
  </UDashboardLayout>
</template>

<script setup>
import { useInfiniteQuery } from '@tanstack/vue-query'

// const colorMode = useColorMode()

// function toggleColorMode() {
//   colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
// }

const sidebarItems = [
 { label: 'All Stars', icon: 'i-mdi-star', badge: '1943' },
 { label: 'Untagged Stars', icon: 'i-mdi-star-outline', badge: '345' },
]

const loadingReposTags = ref(true)
const perPage = ref(10)
const repos = ref([])
const infinityRepos = ref([])
const loadingRepos = ref(false)
const isFetching = ref(false)
const hasNextPage = ref(null)
const fetchNextPage = ref(null)
const isFetchingNextPage = ref(false)
const isError = ref(false)
const error = ref(null)
const newTag = ref(null)

const tags = computed({
  set: (value) => value,
  get: () => {
    if (loadingReposTags.value) return

    let tags = []

    if (repos.value) {
      repos.value.forEach(repo => {
        if (repo.primaryLanguage) {
          let repoTag = repo.primaryLanguage.name.toLowerCase()
          const repoTagExist = tags.some(tag => tag.label === repoTag)
  
          if (repoTagExist) {
            tags = tags.map(tag => {
              if (tag.label === repoTag) {
                tag.repositories.push(repo)
                tag.badge++
              }
  
              return tag
            })
          } else {
            tags.push({
              repositories: [repo],
              label: repoTag,
              icon: 'i-mdi-tag',
              badge: 1
            })
          }
        } else {
          const unknownTagExist = tags.some(tag => tag.label === 'unknown')
  
          if (unknownTagExist) {
            tags = tags.map(tag => {
              if (tag.label === 'unknown') {
                tag.repositories.push(repo)
                tag.badge++
              }
  
              return tag
            })
          } else {
            tags.push({
              repositories: [repo],
              label: 'unknown',
              icon: 'i-mdi-tag',
              badge: 1
            })
          }
        }
      })
    }

    return tags.sort((a, b) => a.badge < b.badge)
  }
})

async function fetchRepos({ pageParam = 1, perPage, refetch }) {
  const data = await $fetch(`/api/github/stars?refetch=${refetch}`)

  if (data) {
    repos.value = data
    loadingReposTags.value = false

    const paginateRepos = data.slice((Number(pageParam) - 1) * Number(perPage), Number(pageParam) * Number(perPage))
    const total = data.length
    const total_pages = Math.ceil(Number(total) / Number(perPage))
    
    return {
      data: paginateRepos || [],
      cursor: pageParam < total_pages ? pageParam + 1 : undefined,
      total: total,
      per_page: Number(perPage),
      total_pages: total_pages,
      remaining: total - (Number(pageParam) * Number(perPage)),
    }
  }
}

function queryReposFetch(perPage, refetch) {
  const {
    data: fetchedReposData,
    error: err,
    fetchNextPage: fetchNP,
    hasNextPage: hasNP,
    isFetching: isF, 
    isFetchingNextPage: isFNP,
    isPending,
    isError: isErr,
  } = useInfiniteQuery({
    queryKey: ['repos', perPage, refetch],
    queryFn: ({ pageParam = 1 }) => fetchRepos({ pageParam, perPage, refetch }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.cursor,
  })

  if (fetchedReposData.value) {
    infinityRepos.value = fetchedReposData.value
    console.log(fetchedReposData.value)
  }

  loadingRepos.value = isPending.value
  isFetching.value = isF.value
  hasNextPage.value = hasNP.value
  fetchNextPage.value = fetchNP.value
  isFetchingNextPage.value = isFNP.value
  isError.value = isErr.value
  error.value = err.value
}

function refetchRepos() {
  queryReposFetch(perPage.value, 1)
}

queryReposFetch(perPage.value, 0)
</script>

