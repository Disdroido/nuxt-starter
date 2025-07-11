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
        <YachtCard
          v-for="yacht in displayedYachts"
          :key="yacht.id || yacht.name"
          :yacht="yacht"
          variant="featured"
          @view-yacht="$emit('view-yacht', yacht)"
          @inquire-yacht="$emit('inquire-yacht', yacht)"
        />
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
import YachtCard from "~/components/builder/YachtCard.vue";

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

const emit = defineEmits(["view-yacht", "inquire-yacht", "load-more"]);

const currentPage = ref(1);

const displayedYachts = computed(() => {
  return props.yachts.slice(0, currentPage.value * props.itemsPerPage);
});

const hasMoreYachts = computed(() => {
  return props.yachts.length > displayedYachts.value.length;
});

const loadMore = () => {
  currentPage.value++;
  emit("load-more", currentPage.value);
};
</script>
