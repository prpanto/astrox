<template>
  <ul
    :class="ui.wrapper"
    v-bind="attrs"
  >
    <li :class="ui.container">
      <div :class="['w-full flex justify-between items-center text-gray-500 dark:text-gray-400', ui.base]">
        <span :class="twMerge(ui.label)">Tags</span>

        <div class="flex items-center space-x-2">
          <UTooltip text="Add Tag" @click="openInput">
            <UIcon
              name="i-mdi-plus"
              :class="twMerge(twJoin(ui.icon.base, ui.inactive), openTagInput ? ' text-gray-900 dark:text-white' : '')"
            />
          </UTooltip>

          <UDropdown :items="items" v-model:open="openSort">
            <UTooltip text="Sort Tags" :prevent="openSort">
              <UIcon
                name="i-mdi-sort"
                :class="twMerge(twJoin(ui.icon.base, ui.inactive), openSort ? ' text-gray-900 dark:text-white' : '')"
              />
            </UTooltip>
          </UDropdown>
        </div>
      </div>

      <Transition
        v-bind="ui.transition"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
      >
        <div v-if="openTagInput" class="py-2">
          <UInput v-model="tag" @keydown.enter="addTag" />
        </div>
      </Transition>

      <!-- <div v-if="loading" :class="ui.wrapper">
        <div class="mt-5 flex items-center justify-center space-x-2">
          <UIcon name="i-bi-arrow-repeat" :class="['size-4 text-gray-900 dark:text-gray-400', loading ? 'animate-spin' : '']" />
          <span class="text-sm font-semibold text-gray-900 dark:text-gray-400">Loading Tags...</span>
        </div>
      </div> -->
      
      <component
        :is="Container"
        :class="ui.wrapper"
        v-bind="{
          ...({ orientation: 'vertical', behaviour: 'contain', lockAxis: 'y', tag: 'ul' }),
          ...attrs
        }"
        @drag-start="isDragging = true"
        @drag-end="isDragging = false"
        @drop="onDrop"
        @touchend="fixActionRestriction"
      >
        <component :is="Draggable" v-for="(tag, index) in tags" :key="index" tag="li" :class="ui.container">
          <ULink
            :class="[ui.base, isDragging && 'pointer-events-none']"
            :active-class="ui.active"
            :inactive-class="(tag.children?.length) ? ui.static : ui.inactive"
          >
            <UIcon
              v-if="tag.icon"
              :name="tag.icon"
              :class="twMerge(twJoin(ui.icon.base, ui.static), tag.iconClass)"
            />

            <span v-if="tag.label" :class="twMerge(ui.label, tag.labelClass)">
              {{ tag.label }}
            </span>

            <UBadge
              v-if="tag.badge"
              v-bind="{
                size: ui.badge.size,
                color: ui.badge.color,
                variant: ui.badge.variant,
                ...((typeof tag.badge === 'string' || typeof tag.badge === 'number') ? { label: tag.badge } : tag.badge)
              }"
              :class="ui.badge.base"
            />
          </ULink>
        </component>
      </component>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
// @ts-ignore
import { twMerge, twJoin } from 'tailwind-merge'

const config = computed(() => ({
  wrapper: 'relative !min-h-[auto] !min-w-[auto]',
  container: '!overflow-visible',
  base: 'group relative flex items-center gap-1.5 px-2.5 py-1.5 w-full rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75',
  active: 'text-gray-900 dark:text-white before:bg-gray-100 dark:before:bg-gray-800',
  inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
  static: 'text-gray-900 dark:text-white cursor-auto',
  icon: {
    base: 'flex-shrink-0 size-5 relative',
    active: 'text-gray-900 dark:text-white',
    inactive: 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'
  },
  badge: {
    base: 'flex-shrink-0 ml-auto relative rounded',
    color: 'gray' as const,
    variant: 'solid' as const,
    size: 'xs' as const
  },
  label: 'text-sm truncate relative',
  transition: {
    enterActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
    leaveActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out'
  }
}))

const items = [[
  { label: 'Sort Ascending', icon: 'i-mdi-sort-alphabetical-ascending', click: () => {} },
  { label: 'Sort Descending', icon: 'i-mdi-sort-alphabetical-descending', click: () => {} },
  { label: 'Restore Sort', icon: 'i-mdi-sort', click: () => {} },
]]

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  },
  tags: {
    type: Object,
    default: () => []
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  },
  ui: {
    type: Object as PropType<Partial<typeof config.value>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:tags', 'added:tag'])

let Container: any
let Draggable: any

// await import('vue3-smooth-dnd' as string).then(({ Container: _Container, Draggable: _Draggable }) => {
//   Container = _Container
//   Draggable = _Draggable
// }).catch()

const isDragging = ref(false)
const openTagInput = ref(false)
const tag = ref('')
const openSort = ref(false)

const { ui, attrs } = useUI('dashboard.sidebar.links', toRef(props, 'ui'), config, toRef(props, 'class'), true)

function onEnter (_el: Element, done: () => void) {
  const el = _el as HTMLElement
  el.style.height = '0'
  el.offsetHeight // Trigger a reflow, flushing the CSS changes
  el.style.height = el.scrollHeight + 'px'

  el.addEventListener('transitionend', done, { once: true })
}

function onBeforeLeave (_el: Element) {
  const el = _el as HTMLElement
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight // Trigger a reflow, flushing the CSS changes
}

function onAfterEnter (_el: Element) {
  const el = _el as HTMLElement
  el.style.height = 'auto'
}

function onLeave (_el: Element, done: () => void) {
  const el = _el as HTMLElement
  el.style.height = '0'

  el.addEventListener('transitionend', done, { once: true })
}

function onDrop (results: { removedIndex: number, addedIndex: number, payload: any }) {
  const { removedIndex, addedIndex, payload } = results

  if (removedIndex === null && addedIndex === null) return
  
  const tags = props.tags
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = tags.splice(removedIndex, 1)[0]
  }
  if (addedIndex !== null) {
    tags.splice(addedIndex, 0, itemToAdd)
  }

  emit('update:tags', tags)
}

function fixActionRestriction () {
  document.body.classList.remove(
    'smooth-dnd-no-user-select',
    'smooth-dnd-disable-touch-action'
  )
}

function openInput () {
  openTagInput.value ^= true

  if (!tag.value) {
    setInterval(() => {
      openTagInput.value = false
    }, 1000 * 60)
  }
}

function addTag () {
  if (!tag.value) return

  props.tags.push({ label: tag.value, icon: 'i-mdi-tag', badge: '0' })

  emit('added:tag', tag.value)
  tag.value = ''
}
</script>
