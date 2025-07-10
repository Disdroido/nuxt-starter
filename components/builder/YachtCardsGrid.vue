<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-light text-gray-900 mb-4">{{ title }}</h2>
        <p v-if="subtitle" class="text-xl text-gray-600 max-w-3xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Yacht Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="yacht in displayedYachts"
          :key="yacht.id || yacht.name"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Yacht Image -->
          <div class="relative h-64 overflow-hidden">
            <img
              :src="
                yacht.mainImage ||
                yacht.images?.[0] ||
                'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop'
              "
              :alt="yacht.name"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <!-- Price Badge -->
            <div
              class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
            >
              <span class="text-sm font-medium text-gray-900">
                {{ formatPrice(yacht.price || yacht.weeklyRate) }}
              </span>
            </div>
            <!-- Charter Type -->
            <div
              v-if="yacht.type"
              class="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ yacht.type }}
            </div>
          </div>

          <!-- Yacht Details -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ yacht.name }}
            </h3>
            <p
              v-if="yacht.location"
              class="text-gray-600 mb-3 flex items-center"
            >
              <MapPin class="w-4 h-4 mr-1" />
              {{ yacht.location }}
            </p>

            <!-- Yacht Specs -->
            <div class="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
              <div v-if="yacht.length" class="text-center">
                <div class="font-medium text-gray-900">{{ yacht.length }}m</div>
                <div>Length</div>
              </div>
              <div v-if="yacht.guests" class="text-center">
                <div class="font-medium text-gray-900">{{ yacht.guests }}</div>
                <div>Guests</div>
              </div>
              <div v-if="yacht.cabins" class="text-center">
                <div class="font-medium text-gray-900">{{ yacht.cabins }}</div>
                <div>Cabins</div>
              </div>
            </div>

            <!-- Features -->
            <div v-if="yacht.features && yacht.features.length" class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="feature in yacht.features.slice(0, 3)"
                  :key="feature"
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                >
                  {{ feature }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <Button
                @click="$emit('view-yacht', yacht)"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                View Details
              </Button>
              <Button
                @click="$emit('inquire-yacht', yacht)"
                variant="outline"
                class="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Heart class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="showLoadMore && hasMoreYachts" class="text-center mt-12">
        <Button
          @click="loadMore"
          variant="outline"
          size="lg"
          class="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          {{ loadMoreText }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { Button } from "~/components/ui/button";
import { MapPin, Heart } from "lucide-vue-next";

const props = defineProps({
  title: {
    type: String,
    default: "Featured Yacht Charters",
  },
  subtitle: {
    type: String,
    default:
      "Discover our handpicked selection of luxury yachts available for charter",
  },
  yachts: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: "Ocean Majesty",
        location: "French Riviera",
        price: "€45,000",
        weeklyRate: "€45,000/week",
        length: "50",
        guests: "12",
        cabins: "6",
        type: "Motor Yacht",
        mainImage:
          "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop",
        features: ["Jacuzzi", "Water Toys", "Chef Included", "WiFi"],
      },
      {
        id: 2,
        name: "Serenity",
        location: "Greek Islands",
        price: "€38,000",
        weeklyRate: "€38,000/week",
        length: "45",
        guests: "10",
        cabins: "5",
        type: "Sailing Yacht",
        mainImage:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop",
        features: ["Diving Equipment", "Kayaks", "Professional Crew"],
      },
      {
        id: 3,
        name: "Azure Dream",
        location: "Balearic Islands",
        price: "€52,000",
        weeklyRate: "€52,000/week",
        length: "55",
        guests: "14",
        cabins: "7",
        type: "Motor Yacht",
        mainImage:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
        features: ["Cinema Room", "Gym", "Spa", "Helipad"],
      },
    ],
  },
  itemsPerPage: {
    type: Number,
    default: 6,
  },
  showLoadMore: {
    type: Boolean,
    default: true,
  },
  loadMoreText: {
    type: String,
    default: "Load More Yachts",
  },
});

console.log(props.yachts)

const emit = defineEmits(["view-yacht", "inquire-yacht", "load-more"]);

const currentPage = ref(1);

const displayedYachts = computed(() => {
  return props.yachts.slice(0, currentPage.value * props.itemsPerPage);
});

const hasMoreYachts = computed(() => {
  return props.yachts.length > displayedYachts.value.length;
});

const formatPrice = (price) => {
  if (!price) return "Price on request";
  if (typeof price === "string") return price;
  return `€${price.toLocaleString()}/week`;
};

const loadMore = () => {
  currentPage.value++;
  emit("load-more", currentPage.value);
};
</script>
