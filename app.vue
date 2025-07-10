<template>
  <!-- Option 1: Use static layout -->
  <!-- <AppLayout /> -->

  <!-- Option 2: Use enhanced layout with Builder.io integration -->
  <!-- <EnhancedLayout /> -->

  <!-- Option 3: Original layout with Header component -->
  <div>
    <LuxuryHeader
      company-name="Yacht Charter Exclusive"
      tagline="Luxury Yacht Charters"
      phone-number="+33 4 93 95 45 45"
      :custom-nav-links="[
        { label: 'Charter', url: '/charter' },
        { label: 'Destinations', url: '/destinations' },
        { label: 'Yachts', url: '/charter' },
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
      ]"
      :use-builder-navigation="true"
      @inquire="handleInquiry"
    />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import LuxuryHeader from "~/components/builder/LuxuryHeader.vue";
// Event handlers
const handleInquiry = () => {
  console.log("Inquiry started");
  // Handle inquiry logic
};
</script>