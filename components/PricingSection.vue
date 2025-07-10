<template>
  <section
    class="box-border flex relative flex-col shrink-0 p-5 mt-5 min-h-[100px]"
  >
    <div
      class="box-border relative grow shrink-0 self-stretch p-5 mx-auto mt-5 w-full max-w-[1200px] min-h-[100px]"
    >
      <div
        class="box-border flex relative flex-col shrink-0 mt-5 w-full h-auto"
      >
        <header class="mb-16 text-center">
          <h2 class="mb-4 text-5xl font-bold text-zinc-900 max-sm:text-4xl">
            Choose Your Plan
          </h2>
          <p
            class="mx-auto my-0 text-xl leading-relaxed max-w-[600px] text-stone-500 max-sm:text-lg"
          >
            Select the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>
        </header>

        <div
          class="grid gap-8 mx-auto my-0 w-full grid-cols-[repeat(auto-fit,minmax(320px,1fr))] max-w-[1200px] max-sm:gap-6 max-sm:grid-cols-[1fr]"
        >
          <PricingCard
            v-for="plan in pricingPlans"
            :key="plan.title"
            :title="plan.title"
            :description="plan.description"
            :price="plan.price"
            :features="plan.features"
            :button-text="plan.buttonText"
            :is-popular="plan.isPopular"
            :variant="plan.variant"
            @plan-selected="handlePlanSelection"
          />
        </div>

        <footer class="p-8 mt-12 text-center bg-gray-50 rounded-2xl">
          <p class="mb-4 text-base text-stone-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div class="flex flex-wrap gap-8 justify-center max-sm:gap-4">
            <span class="text-sm text-zinc-500">✓ Cancel anytime</span>
            <span class="text-sm text-zinc-500">✓ 24/7 support</span>
            <span class="text-sm text-zinc-500">✓ Money-back guarantee</span>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PricingCard from "./PricingCard.vue";

interface PricingPlan {
  title: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  variant: "basic" | "pro" | "enterprise";
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Basic",
    description: "Perfect for getting started",
    price: 9,
    features: [
      "Up to 5 projects",
      "Basic support",
      "1GB storage",
      "Email support",
    ],
    buttonText: "Get Started",
    isPopular: false,
    variant: "basic",
  },
  {
    title: "Pro",
    description: "Best for growing businesses",
    price: 29,
    features: [
      "Unlimited projects",
      "Priority support",
      "100GB storage",
      "Advanced analytics",
      "Team collaboration",
    ],
    buttonText: "Start Free Trial",
    isPopular: true,
    variant: "pro",
  },
  {
    title: "Enterprise",
    description: "For large organizations",
    price: 99,
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
    variant: "enterprise",
  },
];

function handlePlanSelection(planType: string) {
  console.log(`Selected plan: ${planType}`);
  alert(`You selected the ${planType} plan!`);
}
</script>
