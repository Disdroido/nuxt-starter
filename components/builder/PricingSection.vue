<template>
  <section
    class="py-20 px-4"
    :style="{
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      backgroundColor: backgroundColor || '#f8f9fa',
    }"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Hero Section -->
      <div
        v-if="showHero"
        class="text-center mb-16 max-w-4xl mx-auto bg-black/20 backdrop-blur-sm rounded-2xl p-8 text-white"
      >
        <h1 class="text-4xl md:text-6xl font-bold font-['Poppins']">
          {{ heroTitle || "THE HERO" }}
        </h1>
      </div>

      <!-- Pricing Header -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']"
        >
          {{ title || "Choose Your Plan" }}
        </h2>
        <p
          class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-['Poppins']"
        >
          {{
            subtitle ||
            "Select the perfect plan for your needs. Upgrade or downgrade at any time."
          }}
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Basic Plan -->
        <div
          class="pricing-card bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
        >
          <div class="text-center mb-8">
            <h3
              class="text-2xl font-semibold text-gray-900 mb-2 font-['Poppins']"
            >
              {{ basicTitle || "Basic" }}
            </h3>
            <p class="text-gray-600 mb-6 font-['Poppins']">
              {{ basicDescription || "Perfect for getting started" }}
            </p>
            <div class="flex items-baseline justify-center mb-2">
              <span class="text-5xl font-bold text-gray-900 font-['Poppins']">
                ${{ basicPrice || "9" }}
              </span>
              <span class="text-lg text-gray-600 ml-1 font-['Poppins']"
                >/month</span
              >
            </div>
          </div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ basicFeature1 || "Up to 5 projects" }}</span>
            </li>
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ basicFeature2 || "Basic support" }}</span>
            </li>
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ basicFeature3 || "1GB storage" }}</span>
            </li>
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ basicFeature4 || "Email support" }}</span>
            </li>
          </ul>
          <Button
            @click="handlePlanSelection('Basic')"
            class="w-full py-4 bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 hover:border-gray-300 font-['Poppins']"
          >
            {{ basicButtonText || "Get Started" }}
          </Button>
        </div>

        <!-- Pro Plan (Featured) -->
        <div
          class="pricing-card relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl border-2 border-transparent transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-3xl text-white"
        >
          <div
            class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-semibold font-['Poppins']"
          >
            {{ popularBadge || "Most Popular" }}
          </div>
          <div class="text-center mb-8">
            <h3 class="text-2xl font-semibold mb-2 font-['Poppins']">
              {{ proTitle || "Pro" }}
            </h3>
            <p class="text-blue-100 mb-6 font-['Poppins']">
              {{ proDescription || "Best for growing businesses" }}
            </p>
            <div class="flex items-baseline justify-center mb-2">
              <span class="text-5xl font-bold font-['Poppins']">
                ${{ proPrice || "29" }}
              </span>
              <span class="text-lg text-blue-100 ml-1 font-['Poppins']"
                >/month</span
              >
            </div>
          </div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center font-['Poppins']">
              <span class="text-yellow-400 mr-3 text-xl">✓</span>
              <span>{{ proFeature1 || "Unlimited projects" }}</span>
            </li>
            <li class="flex items-center font-['Poppins']">
              <span class="text-yellow-400 mr-3 text-xl">✓</span>
              <span>{{ proFeature2 || "Priority support" }}</span>
            </li>
            <li class="flex items-center font-['Poppins']">
              <span class="text-yellow-400 mr-3 text-xl">✓</span>
              <span>{{ proFeature3 || "100GB storage" }}</span>
            </li>
            <li class="flex items-center font-['Poppins']">
              <span class="text-yellow-400 mr-3 text-xl">✓</span>
              <span>{{ proFeature4 || "Advanced analytics" }}</span>
            </li>
            <li class="flex items-center font-['Poppins']">
              <span class="text-yellow-400 mr-3 text-xl">✓</span>
              <span>{{ proFeature5 || "Team collaboration" }}</span>
            </li>
          </ul>
          <Button
            @click="handlePlanSelection('Pro')"
            class="w-full py-4 bg-white text-blue-600 border-2 border-white rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50 hover:transform hover:-translate-y-1 font-['Poppins']"
          >
            {{ proButtonText || "Start Free Trial" }}
          </Button>
        </div>

        <!-- Enterprise Plan -->
        <div
          class="pricing-card bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
        >
          <div class="text-center mb-8">
            <h3
              class="text-2xl font-semibold text-gray-900 mb-2 font-['Poppins']"
            >
              {{ enterpriseTitle || "Enterprise" }}
            </h3>
            <p class="text-gray-600 mb-6 font-['Poppins']">
              {{ enterpriseDescription || "For large organizations" }}
            </p>
            <div class="flex items-baseline justify-center mb-2">
              <span class="text-5xl font-bold text-gray-900 font-['Poppins']">
                ${{ enterprisePrice || "99" }}
              </span>
              <span class="text-lg text-gray-600 ml-1 font-['Poppins']"
                >/month</span
              >
            </div>
          </div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ enterpriseFeature1 || "Everything in Pro" }}</span>
            </li>
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ enterpriseFeature2 || "Dedicated support" }}</span>
            </li>
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ enterpriseFeature3 || "Unlimited storage" }}</span>
            </li>
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ enterpriseFeature4 || "Custom integrations" }}</span>
            </li>
            <li class="flex items-center text-gray-700 font-['Poppins']">
              <span class="text-green-500 mr-3 text-xl">✓</span>
              <span>{{ enterpriseFeature5 || "SLA guarantee" }}</span>
            </li>
          </ul>
          <Button
            @click="handlePlanSelection('Enterprise')"
            class="w-full py-4 bg-gray-900 text-white border-2 border-gray-900 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-800 hover:border-gray-800 font-['Poppins']"
          >
            {{ enterpriseButtonText || "Contact Sales" }}
          </Button>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-12 p-8 bg-white rounded-2xl shadow-sm">
        <p class="text-gray-600 mb-6 font-['Poppins']">
          {{
            bottomText ||
            "All plans include a 14-day free trial. No credit card required."
          }}
        </p>
        <div class="flex justify-center gap-8 flex-wrap">
          <span class="text-sm text-gray-500 font-['Poppins']"
            >✓ Cancel anytime</span
          >
          <span class="text-sm text-gray-500 font-['Poppins']"
            >✓ 24/7 support</span
          >
          <span class="text-sm text-gray-500 font-['Poppins']"
            >✓ Money-back guarantee</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{
  // Hero Section
  showHero?: boolean;
  heroTitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;

  // Header
  title?: string;
  subtitle?: string;

  // Basic Plan
  basicTitle?: string;
  basicDescription?: string;
  basicPrice?: string;
  basicFeature1?: string;
  basicFeature2?: string;
  basicFeature3?: string;
  basicFeature4?: string;
  basicButtonText?: string;

  // Pro Plan
  popularBadge?: string;
  proTitle?: string;
  proDescription?: string;
  proPrice?: string;
  proFeature1?: string;
  proFeature2?: string;
  proFeature3?: string;
  proFeature4?: string;
  proFeature5?: string;
  proButtonText?: string;

  // Enterprise Plan
  enterpriseTitle?: string;
  enterpriseDescription?: string;
  enterprisePrice?: string;
  enterpriseFeature1?: string;
  enterpriseFeature2?: string;
  enterpriseFeature3?: string;
  enterpriseFeature4?: string;
  enterpriseFeature5?: string;
  enterpriseButtonText?: string;

  // Bottom
  bottomText?: string;
}>();

const handlePlanSelection = (planType: string) => {
  console.log(`Selected plan: ${planType}`);
  // You can add your custom logic here, such as:
  // - Redirecting to checkout
  // - Opening a modal
  // - Making an API call
  alert(`You selected the ${planType} plan!`);
};
</script>

<style scoped>
.pricing-card {
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .pricing-card {
    margin-bottom: 2rem;
  }
}
</style>
