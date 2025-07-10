<!-- pages/[...app].vue -->

<script setup>
import { Content, fetchOneEntry, isPreviewing } from "@builder.io/sdk-vue";
import { ref, computed, watchEffect } from "vue";

// Import all custom components for the visual editor
import HeroSection from "~/components/builder/HeroSection.vue";
import FeatureCard from "~/components/builder/FeatureCard.vue";
import CTASection from "~/components/builder/CTASection.vue";
import TestimonialCard from "~/components/builder/TestimonialCard.vue";
import StatsSection from "~/components/builder/StatsSection.vue";
import CustomHeader from "~/components/builder/CustomHeader.vue";
import PricingSection from "~/components/builder/PricingSection.vue";

const route = useRoute();

// TO DO: Add your Public API Key here
const apiKey = "25becc87cdbf4edab9eccb09d448af92";
const model = "page";

const pageContent = ref(null);

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
});

const canShowContent = computed(() =>
  content.value ? true : isPreviewing(route.path),
);
</script>

<template>
  <div v-if="canShowContent">
    <Content :api-key="apiKey" :model="model" :content="pageContent" />
  </div>
  <div v-else-if="refresh">
    <div class="w-full h-dvh flex items-center justify-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"
      ></div>
    </div>
  </div>
  <div v-else>Content not Found</div>
</template>
