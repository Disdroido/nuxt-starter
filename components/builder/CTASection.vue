<template>
  <section class="bg-gray-50 py-16 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {{ title || "Ready to Get Started?" }}
      </h2>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        {{
          subtitle ||
          "Join thousands of satisfied customers who have transformed their business with our solutions."
        }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="bg-blue-600 hover:bg-blue-700 text-white">
          {{ primaryButtonText || "Start Free Trial" }}
        </Button>
        <Button
          size="lg"
          variant="outline"
          class="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          {{ secondaryButtonText || "Contact Sales" }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

defineProps<Props>();
</script>
