<template>
  <section
    class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4"
  >
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        {{ title || "Welcome to Our Platform" }}
      </h1>
      <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
        {{
          subtitle ||
          "Discover amazing features and transform your experience with our cutting-edge solutions."
        }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          variant="secondary"
          class="bg-white text-blue-600 hover:bg-gray-100"
        >
          {{ primaryButtonText || "Get Started" }}
        </Button>
        <Button
          size="lg"
          variant="outline"
          class="border-white text-white hover:bg-white hover:text-blue-600"
        >
          {{ secondaryButtonText || "Learn More" }}
        </Button>
      </div>
    </div>
    <div class="absolute inset-0 bg-black opacity-10"></div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

defineProps<Props>();
</script>
