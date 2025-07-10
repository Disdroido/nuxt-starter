<template>
  <section class="bg-blue-600 text-white py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          {{ title || "Trusted by Industry Leaders" }}
        </h2>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          {{
            subtitle ||
            "See why thousands of companies choose our platform for their success."
          }}
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-bold mb-2">
            {{ stat1Number || "10K+" }}
          </div>
          <div class="text-lg opacity-90">
            {{ stat1Label || "Happy Customers" }}
          </div>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-bold mb-2">
            {{ stat2Number || "99%" }}
          </div>
          <div class="text-lg opacity-90">{{ stat2Label || "Uptime" }}</div>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-bold mb-2">
            {{ stat3Number || "50M+" }}
          </div>
          <div class="text-lg opacity-90">
            {{ stat3Label || "Transactions" }}
          </div>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-bold mb-2">
            {{ stat4Number || "24/7" }}
          </div>
          <div class="text-lg opacity-90">{{ stat4Label || "Support" }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
  stat4Number?: string;
  stat4Label?: string;
}>();
</script>
