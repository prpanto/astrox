<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
    color?: string
  }>(),
  {
    count: 200,
    color: '#fff'
  }
);
</script>

<template>
  <div class="fixed size-full flex justify-center items-center">
    <div class="absolute inset-0 size-full overflow-hidden perspective-[10vmin]">
      <ClientOnly>
        <div v-for="star in count" :key="'star_' + star"
          class="animate-stars size-[1.5vmin] absolute shadow-[0_0_20px_rgb(10,239,255)] transform-[translateZ(-100vmin)_rotateY(90deg)_rotateX(var(--rx))_translateZ(var(--x))_scaleX(1)]"
          :style="{
            backgroundColor: color,
            '--x': `${Math.random() * 200}vmax`,
            '--y': `${Math.random() * 100}vh`,
            '--z': `${Math.random() * 200 - 100}vmin`,
            '--rx': `${Math.random() * 360}deg`,
            animationDelay: `${Math.random() * 1.5}s`,
          }" />
      </ClientOnly>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.animate-stars {
  animation: stars 1.5s infinite ease-in;
}

@keyframes stars {

  0%,
  90% {
    opacity: 1;
  }

  100% {
    transform: translateZ(0vmin) rotateY(90deg) rotateX(var(--rx)) translateZ(var(--x)) scaleX(6);
  }
}
</style>
