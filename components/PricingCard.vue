<template>
  <article
    :class="[
      'relative px-8 py-10 rounded-3xl border-2 border-solid transition-all duration-[0.3s] ease-[ease]',
      cardClasses,
    ]"
  >
    <div
      v-if="isPopular"
      class="absolute -top-3 left-2/4 px-6 py-2 text-sm font-semibold bg-amber-400 rounded-3xl -translate-x-2/4 text-zinc-900"
    >
      Most Popular
    </div>

    <header class="mb-8 text-center">
      <h3 :class="['mb-2 text-2xl font-semibold', titleColor]">{{ title }}</h3>
      <p :class="['mb-6 text-base', descriptionColor]">{{ description }}</p>
      <div class="flex justify-center items-baseline mb-2">
        <span :class="['text-5xl font-bold', priceColor]">${{ price }}</span>
        <span :class="['ml-1 text-lg', periodColor]">/month</span>
      </div>
    </header>

    <ul class="p-0 mx-0 mt-0 mb-8">
      <li
        v-for="feature in features"
        :key="feature"
        :class="['flex items-center mb-4 text-base', featureTextColor]"
      >
        <span :class="['mr-3 text-xl', checkmarkColor]">✓</span>
        {{ feature }}
      </li>
    </ul>

    <button
      :class="[
        'px-6 py-4 w-full text-base font-semibold rounded-xl border-2 border-solid transition-all cursor-pointer duration-[0.3s] ease-[ease]',
        buttonClasses,
      ]"
      role="button"
      :aria-label="`Select ${title} plan for $${price} per month`"
      :tabIndex="0"
      @click="handlePlanSelection"
      @keydown="handleKeyDown"
    >
      {{ buttonText }}
    </button>
  </article>
</template>

<script setup lang="ts">
interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  variant?: "basic" | "pro" | "enterprise";
}

const props = withDefaults(defineProps<PricingCardProps>(), {
  isPopular: false,
  variant: "basic",
});

const emit = defineEmits<{
  planSelected: [planType: string];
}>();

const cardClasses = computed(() => {
  if (props.variant === "pro") {
    return "border-transparent shadow-[0_16px_48px_rgba(102,126,234,0.3)] text-[white] bg-gradient-to-br from-indigo-500 to-purple-600 hover:transform hover:translate-y-[-8px] hover:shadow-[0_24px_64px_rgba(102,126,234,0.4)]";
  }
  return "border-zinc-100 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:transform hover:translate-y-[-8px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] hover:border-[#e0e0e0]";
});

const titleColor = computed(() => {
  return props.variant === "pro" ? "text-[white]" : "text-zinc-900";
});

const descriptionColor = computed(() => {
  return props.variant === "pro"
    ? "text-white text-opacity-80"
    : "text-stone-500";
});

const priceColor = computed(() => {
  return props.variant === "pro" ? "text-[white]" : "text-zinc-900";
});

const periodColor = computed(() => {
  return props.variant === "pro"
    ? "text-white text-opacity-80"
    : "text-stone-500";
});

const featureTextColor = computed(() => {
  return props.variant === "pro" ? "text-[white]" : "text-zinc-800";
});

const checkmarkColor = computed(() => {
  return props.variant === "pro" ? "text-amber-400" : "text-green-500";
});

const buttonClasses = computed(() => {
  if (props.variant === "pro") {
    return "text-indigo-500 bg-[white] border-[white] hover:bg-[rgba(255,255,255,0.9)] hover:transform hover:translate-y-[-2px] focus:outline-2 focus:outline-[#fbbf24] focus:outline-offset-2 active:transform active:translate-y-[1px]";
  }
  if (props.variant === "enterprise") {
    return "bg-zinc-900 border-zinc-900 text-[white] hover:bg-[#333] hover:border-[#333] focus:outline-2 focus:outline-[#667eea] focus:outline-offset-2 active:transform active:translate-y-[1px]";
  }
  return "bg-gray-50 border-gray-200 text-zinc-800 hover:bg-[#e9ecef] hover:border-[#dee2e6] focus:outline-2 focus:outline-[#667eea] focus:outline-offset-2 active:transform active:translate-y-[1px]";
});

function handlePlanSelection() {
  emit("planSelected", props.title);
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handlePlanSelection();
  }
}
</script>
