<template>
  <section class="relative h-screen overflow-hidden">
    <!-- Background Image/Video -->
    <div class="absolute inset-0">
      <img
        :src="
          backgroundImage ||
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
        "
        :alt="imageAlt"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/30"></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 h-full flex items-center justify-center text-center text-white"
    >
      <div class="max-w-4xl px-4 sm:px-6 lg:px-8">
        <!-- Main Headline -->
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 tracking-wide"
        >
          {{ title }}
        </h1>

        <!-- Subtitle -->
        <p
          v-if="subtitle"
          class="text-xl sm:text-2xl mb-8 font-light opacity-90 max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>

        <!-- Search Form -->
        <div
          v-if="showSearchForm"
          class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto mb-8"
        >
          <form
            @submit.prevent="handleSearch"
            class="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Destination</label
              >
              <select
                v-model="searchForm.location"
                class="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Destinations</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Caribbean">Caribbean</option>
                <option value="French Riviera">French Riviera</option>
                <option value="Greek Islands">Greek Islands</option>
                <option value="Balearic Islands">Balearic Islands</option>
                <option value="Amalfi Coast">Amalfi Coast</option>
                <option value="Croatia">Croatia</option>
              </select>
            </div>
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Yacht Type</label
              >
              <select
                v-model="searchForm.yachtType"
                class="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Motor">Motor Yacht</option>
                <option value="Sailing">Sailing Yacht</option>
                <option value="Catamaran">Catamaran</option>
                <option value="Superyacht">Superyacht</option>
              </select>
            </div>
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Length (m)</label
              >
              <select
                v-model="searchForm.length"
                class="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Length</option>
                <option value="20-30">20-30m</option>
                <option value="30-40">30-40m</option>
                <option value="40-60">40-60m</option>
                <option value="60+">60m+</option>
              </select>
            </div>
            <div class="md:col-span-1 flex items-end">
              <Button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors"
              >
                {{ searchButtonText }}
              </Button>
            </div>
          </form>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            v-if="primaryButtonText"
            size="lg"
            class="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {{ primaryButtonText }}
          </Button>
          <Button
            v-if="secondaryButtonText"
            variant="outline"
            size="lg"
            class="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
          >
            {{ secondaryButtonText }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <div
        class="w-6 h-10 border-2 border-white rounded-full flex justify-center"
      >
        <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { Button } from "~/components/ui/button";

const props = defineProps({
  title: {
    type: String,
    default: "Paradise awaits",
  },
  subtitle: {
    type: String,
    default: "Discover the world's most exclusive yacht charters",
  },
  backgroundImage: {
    type: String,
    default: "",
  },
  imageAlt: {
    type: String,
    default: "Luxury yacht charter",
  },
  showSearchForm: {
    type: Boolean,
    default: true,
  },
  searchButtonText: {
    type: String,
    default: "Search Yachts",
  },
  primaryButtonText: {
    type: String,
    default: "Explore Yachts",
  },
  secondaryButtonText: {
    type: String,
    default: "View Destinations",
  },
});

const emit = defineEmits(["search"]);

// Search form data
const searchForm = reactive({
  location: "",
  yachtType: "",
  length: "",
});

// Handle search submission
const handleSearch = () => {
  const params = new URLSearchParams();

  // Add search parameters
  params.set("dataType", "charter");

  if (searchForm.location) {
    params.set("location", searchForm.location);
  }

  if (searchForm.yachtType) {
    params.set("yachtType", searchForm.yachtType);
  }

  if (searchForm.length) {
    const [min, max] = searchForm.length.split("-");
    if (min) params.set("minLength", min);
    if (max && max !== "+") params.set("maxLength", max);
    else if (searchForm.length.includes("+")) {
      params.set("minLength", searchForm.length.replace("+", ""));
    }
  }

  // Navigate to charter page with search parameters
  navigateTo(`/charter?${params.toString()}`);
};
</script>
