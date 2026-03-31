<script setup lang="ts">
const login = async () => {
  await auth.signIn.social({
    provider: "github",
  });
}
</script>

<template>
  <ShootingStars class="bg-gray-950">
    <div class="flex flex-col items-center justify-center gap-4 z-10">
      <div class="flex items-center gap-4">
        <Logo />
        <h2 class="text-white text-5xl font-bold font-nasa tracking-wider uppercase">Astrox</h2>
      </div>

      <UButton icon="i-lucide-log-in" size="xl" color="neutral" variant="solid" @click="login">Login</UButton>
    </div>
  </ShootingStars>
</template>