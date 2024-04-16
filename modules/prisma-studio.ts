import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { setupPrismaStudio } from '../utils/viewer'

export default defineNuxtModule({
  meta: {
    name: 'prisma-studio',
    configKey: 'prisma',
  },
  setup(options, nuxt) {
    setupPrismaStudio()
 
    nuxt.hook('devtools:customTabs', (tabs) => {
      tabs.push({
        title: 'Prisma Studio',
        name: 'Prisma Studio',
        icon: 'simple-icons:prisma',
        view: {
          type: 'iframe',
          src: 'http://localhost:5555/',
        },
      })
    })
  },
})

