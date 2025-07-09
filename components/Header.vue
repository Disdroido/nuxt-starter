<template>
  <header class="bg-white shadow-sm relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img
              src="https://ahoyclub.com/logo/ahoy-club-logo-dark.svg"
              class="w-36 h-auto"
            />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="link in links"
            :key="link.id"
            :to="link.data.url"
            class="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            {{ link.data.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Sheet v-model:open="showMobileMenu">
      <SheetContent
        :aria-describedby="undefined"
        class="p-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <!-- Authenticated User Mobile Menu -->
        <div class="flex flex-col h-full">

          <!-- Navigation -->
          <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <!-- Dashboard Home -->
            <NuxtLink
              v-for="link in links"
              :key="link.id"
              :to="link.data.url"
              class="nav-item"
              :class="{
                'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-r-2 border-red-500':
                  link.data.url === route.path,
              }"
              @click="showMobileMenu = false"
            >
              <LayoutDashboard class="w-5 h-5 flex-shrink-0" />
              <span>{{ link.data.label }}</span>
            </NuxtLink>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  </header>
</template>

<script setup>
import { fetchEntries } from '@builder.io/sdk-vue';

const links = ref([]);

const { data: navLinks } = await useAsyncData('builderDataNavLinks', () =>
  fetchEntries({
    model: 'nav-link',
    apiKey: '25becc87cdbf4edab9eccb09d448af92',
  })
);

links.value = navLinks.value || [];
</script>