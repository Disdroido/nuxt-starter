<template>
  <div>
    <div class="min-h-screen bg-white text-gray-900 font-sans">
      <div class="relative">
        <div class="relative">
          <header class="relative">
            <div class="relative">
              <div class="flex w-full">
                <div class="flex w-full">
                  <div class="flex items-center w-full">
                    <NuxtLink
                      to="/"
                      class="flex items-center"
                      aria-current="page"
                    >
                      <img
                        src="https://ahoyclub.com/logo/ahoy-club-logo-dark.svg"
                        alt="Ahoy Club Logo"
                        class="block h-auto"
                      />
                    </NuxtLink>
                  </div>
                  <nav class="flex items-center space-x-6">
                    <!-- Dynamic navigation from Builder.io -->
                    <NuxtLink
                      v-for="link in links"
                      :key="link.id"
                      :to="link.data.url"
                      class="text-gray-900 hover:text-gray-700 font-medium transition-colors"
                    >
                      {{ link.data.label }}
                    </NuxtLink>
                  </nav>
                  <div class="hidden">
                    <button
                      type="button"
                      class="inline-flex bg-transparent border-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="block"
                      >
                        <path d="M4 12h16" />
                        <path d="M4 18h16" />
                        <path d="M4 6h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div class="relative">
            <div class="relative">
              <div class="flex">
                <div class="flex">
                  <section class="flex">
                    <div class="flex">
                      <div class="relative">
                        <!-- Dynamic content from Builder.io -->
                        <div v-if="canShowContent">
                          <Content
                            :api-key="apiKey"
                            :model="model"
                            :content="pageContent"
                          />
                        </div>
                        <div v-else-if="isLoading">
                          <div
                            class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"
                          ></div>
                        </div>
                        <div v-else>
                          <!-- Fallback content -->
                          <slot>THE HERO</slot>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative mt-5">
      <slot name="additional-content"> new text </slot>
    </div>
  </div>
</template>

<script setup>
import {
  Content,
  fetchOneEntry,
  fetchEntries,
  isPreviewing,
} from "@builder.io/sdk-vue";
import { ref, computed, watchEffect } from "vue";

const route = useRoute();

// Builder.io configuration
const apiKey = "25becc87cdbf4edab9eccb09d448af92";
const model = "page";

const pageContent = ref(null);
const links = ref([]);
const isLoading = ref(true);

// Fetch navigation links
const { data: navLinks } = await useAsyncData("builderDataNavLinks", () =>
  fetchEntries({
    model: "nav-link",
    apiKey,
  }),
);

links.value = navLinks.value || [];

// Fetch page content
const { data: content, refresh } = useAsyncData(
  route.path,
  () =>
    fetchOneEntry({
      model,
      apiKey,
      userAttributes: {
        urlPath: route.path,
      },
    }),
  {
    watch: [route.path],
    immediate: true,
  },
);

watchEffect(() => {
  pageContent.value = content.value;
  isLoading.value = false;
});

const canShowContent = computed(() =>
  content.value ? true : isPreviewing(route.path),
);
</script>
