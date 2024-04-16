<template>
  <UDashboardPanelContent>
    <div v-if="loading" class="h-screen flex justify-center items-center">
      <UIcon name="i-mdi-loading" class="size-12 animate-spin" />
    </div>


    <div v-else>
      <div :class="[
          'max-h-fit border-b border-gray-500',
          repo.isArchived ? 'mb-5' : ''
        ]"
      >
        <div class="flex items-center justify-between mb-2">
          <NuxtLink :to="repo.url">
            <UTooltip text="Redirect to repository">
              <div class="flex items-center space-x-1">
                <UIcon name="i-mdi-link-variant" class="size-5 text-gray-400" />
                <span class="text-xl">{{ repo.nameWithOwner.split('/')[1] }}</span>
              </div>
            </UTooltip>
          </NuxtLink>

          <div class="flex items-center space-x-4">
            <UTooltip v-if="repo.homepageUrl" text="Homepage Url" class="mr-2">
              <NuxtLink :to="repo.homepageUrl" target="_blank" class="flex items-center space-x-1">
                <UIcon name="i-mdi-link-variant" class="mr-0.5 flex-shrink-0 size-4 text-gray-500 dark:text-gray-400" />
                <span class="text-xs text-gray-500 dark:text-gray-400">Homepage Url</span>
              </NuxtLink>
            </UTooltip>

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

            <UTooltip v-if="repo.primaryLanguage" text="Primary Language">
              <div class="flex items-center p-1 py-[1px] rounded-lg" :style="{backgroundColor: repo.primaryLanguage.color}">
                <span :class="['text-xs font-semibold', repo.primaryLanguage.color === '#f1e05a' ? 'text-gray-900' : 'text-white']">{{ repo.primaryLanguage.name }}</span>
              </div>
            </UTooltip>
          </div>
        </div>

        <p class="my-2 text-xs text-gray-500 dark:text-gray-400">{{ repo.description }}</p>
      </div>     

      <div v-if="repo.isArchived" class="w-full mb-5 bg-orange-600 px-2 py-1">
        <p class="font-semibold text-center">This repository is archive by owner</p>
      </div>

      <div ref="readmeRef" class="readme prose-lg dark:text-gray-100
        dark:prose-a:text-emerald-600 dark:prose-a:underline [&>a[class~=anchor]]:mr-2.5 hover:[&>a]:text-decoration-none
        prose-headings:m-[1em_0] dark:prose-headings:text-gray-100
        [$>.markdown-body>h1]:mt-0
        

        dark:prose-code:text-gray-100
        dark:prose-blockquote:text-gray-100
        dark:prose-strong:text-gray-100
      " v-html="readme" />
    </div>
  </UDashboardPanelContent>
</template>

<script setup>
import { watch, toRef } from 'vue'
import * as ufo from "ufo";
import showdown from 'showdown'

const props = defineProps({
  repo: Object,
})

const repo = toRef(() => props.repo)
const readmeRef = ref()
const loading = ref(false)
const readme = ref()

function bindAnchors() {
  readmeRef.value = null
  
  watch(readmeRef, (newReadmeRef, oldReadmeRef) => {
    if (newReadmeRef) {
      Array
        .from(newReadmeRef.querySelectorAll('a'))
        .forEach(anchor => {
          anchor.addEventListener('click', event => {
              const target = event.currentTarget
              if (target.classList.contains('anchor') || target.getAttribute('href').startsWith('#')) {
                event.preventDefault()
                const target = target.getAttribute('href')
                const section = newReadmeRef.querySelector(`#user-content-${target.substring(1)}`)
                this.$refs.readme.scrollTop = section.offsetTop - 74
              }
            }, false)
        })
    }
  }, { immediate: true })
}

function fixRelativeImagePaths() {
  readmeRef.value = null
  
  watch(readmeRef, (newReadmeRef, oldReadmeRef) => {
    if (newReadmeRef) {
      Array
        .from(newReadmeRef.querySelectorAll('img[src]'))
        .forEach(img => {
          const parseURL = ufo.parseURL(img.src)
          const urlOrigin = `${parseURL.protocol}//${parseURL.host}`
          
          if (urlOrigin === window.location.origin) {
            img.src = `${repo.value.url}/raw/${repo.value.defaultBranchRef.name}/${parseURL.pathname}`
          }
        })
    }
  }, { immediate: true })
}

watch(repo, async (newRepo, oldRepo) => {
  readme.value = null

  if (newRepo) {
    try {
      loading.value = true
  
      const readmeData = await $fetch('/api/github/readme', {
        method: 'POST',
        body: {
          username: newRepo.nameWithOwner.split('/')[0],
          repo: newRepo.nameWithOwner.split('/')[1],
        }
      })

      const converter = new showdown.Converter()
      const html = converter.makeHtml(readmeData.repository.object.text)

      readme.value = html
      fixRelativeImagePaths()
      bindAnchors()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
}, { immediate: true })
</script>
