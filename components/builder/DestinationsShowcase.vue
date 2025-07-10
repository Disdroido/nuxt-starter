<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-light text-gray-900 mb-4">{{ title }}</h2>
        <p v-if="subtitle" class="text-xl text-gray-600 max-w-3xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Destinations Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Featured Destination (Large) -->
        <div
          v-if="destinations[0]"
          class="lg:row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          @click="$emit('select-destination', destinations[0])"
        >
          <div class="aspect-w-16 aspect-h-20 lg:aspect-h-32">
            <img
              :src="destinations[0].image"
              :alt="destinations[0].name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 class="text-3xl font-light mb-2">{{ destinations[0].name }}</h3>
            <p class="text-lg opacity-90 mb-3">
              {{ destinations[0].description }}
            </p>
            <div class="flex items-center justify-between">
              <span
                class="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                {{ destinations[0].yachtCount || "25+" }} yachts available
              </span>
              <div class="flex items-center text-sm">
                <span>Explore</span>
                <ArrowRight
                  class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Other Destinations -->
        <div class="space-y-8">
          <div
            v-for="destination in destinations.slice(1, 3)"
            :key="destination.id"
            class="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            @click="$emit('select-destination', destination)"
          >
            <div class="aspect-w-16 aspect-h-9 h-64">
              <img
                :src="destination.image"
                :alt="destination.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            ></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-medium mb-1">{{ destination.name }}</h3>
              <p class="text-sm opacity-90 mb-2">
                {{ destination.description }}
              </p>
              <div class="flex items-center justify-between">
                <span
                  class="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                >
                  {{ destination.yachtCount || "15+" }} yachts
                </span>
                <ArrowRight
                  class="w-4 h-4 transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Destinations Row -->
      <div
        v-if="destinations.length > 3"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
      >
        <div
          v-for="destination in destinations.slice(3, 6)"
          :key="destination.id"
          class="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          @click="$emit('select-destination', destination)"
        >
          <div class="aspect-w-16 aspect-h-10 h-48">
            <img
              :src="destination.image"
              :alt="destination.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h4 class="text-lg font-medium mb-1">{{ destination.name }}</h4>
            <div class="flex items-center justify-between">
              <span
                class="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
              >
                {{ destination.yachtCount || "10+" }} yachts
              </span>
              <ArrowRight
                class="w-3 h-3 transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div v-if="showViewAll" class="text-center mt-12">
        <Button
          @click="$emit('view-all-destinations')"
          variant="outline"
          size="lg"
          class="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          {{ viewAllText }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-vue-next";

defineProps({
  title: {
    type: String,
    default: "Discover Destinations",
  },
  subtitle: {
    type: String,
    default:
      "Explore the world's most beautiful charter destinations with our curated selection of premium locations",
  },
  destinations: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: "French Riviera",
        description:
          "Glamorous coastline with crystal-clear waters and exclusive marinas",
        yachtCount: "45",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Greek Islands",
        description:
          "Ancient history meets pristine beaches and turquoise seas",
        yachtCount: "38",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2069&auto=format&fit=crop",
      },
      {
        id: 3,
        name: "Caribbean",
        description: "Tropical paradise with endless sunshine and coral reefs",
        yachtCount: "52",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Balearic Islands",
        description:
          "Vibrant nightlife and secluded coves in the Mediterranean",
        yachtCount: "28",
        image:
          "https://images.unsplash.com/photo-1571406555462-9350aa1c7670?q=80&w=2069&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Amalfi Coast",
        description: "Dramatic cliffs and charming coastal towns",
        yachtCount: "22",
        image:
          "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Croatia",
        description: "Pristine national parks and historic coastal cities",
        yachtCount: "35",
        image:
          "https://images.unsplash.com/photo-1555950808-8a137c4143ea?q=80&w=2069&auto=format&fit=crop",
      },
    ],
  },
  showViewAll: {
    type: Boolean,
    default: true,
  },
  viewAllText: {
    type: String,
    default: "View All Destinations",
  },
});

defineEmits(["select-destination", "view-all-destinations"]);
</script>
