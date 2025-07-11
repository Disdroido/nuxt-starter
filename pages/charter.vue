<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-light text-gray-900 mb-2">Yacht Charters</h1>
        <p class="text-lg text-gray-600">
          Discover luxury yachts available for charter
        </p>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <form
          @submit.prevent="updateSearch"
          class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <!-- Search -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Search</label
            >
            <input
              v-model="searchParams.search"
              type="text"
              placeholder="Search yachts..."
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Location</label
            >
            <select
              v-model="searchParams.location"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Caribbean">Caribbean</option>
              <option value="French Riviera">French Riviera</option>
              <option value="Greek Islands">Greek Islands</option>
              <option value="Balearic Islands">Balearic Islands</option>
              <option value="Amalfi Coast">Amalfi Coast</option>
              <option value="Croatia">Croatia</option>
            </select>
          </div>

          <!-- Yacht Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Type</label
            >
            <select
              v-model="searchParams.yachtType"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="Motor">Motor Yacht</option>
              <option value="Sailing">Sailing Yacht</option>
              <option value="Catamaran">Catamaran</option>
            </select>
          </div>

          <!-- Length -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Length</label
            >
            <select
              v-model="lengthRange"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any Length</option>
              <option value="20-30">20-30m</option>
              <option value="30-40">30-40m</option>
              <option value="40-60">40-60m</option>
              <option value="60+">60m+</option>
            </select>
          </div>

          <!-- Search Button -->
          <div class="flex items-end">
            <Button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <!-- Results Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <p class="text-gray-600">
            {{ isLoading ? "Loading..." : `${data?.pagination?.total} yachts found` }}
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <select
            v-model="searchParams.sortBy"
            @change="updateSearch"
            class="border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="created_at">Newest</option>
            <option value="price">Price</option>
            <option value="length">Length</option>
            <option value="name">Name</option>
          </select>
          <select
            v-model="searchParams.sortOrder"
            @change="updateSearch"
            class="border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Yacht Cards Grid -->
      <div
        v-else-if="yachts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
          <YachtCard v-for="yacht in yachts" :key="yacht.yacht.id" :yacht="yacht.yacht" variant="default" />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <div class="text-gray-500 text-lg mb-4">
          No yachts found matching your criteria
        </div>
        <Button @click="clearFilters" variant="outline">Clear Filters</Button>
      </div>

      <!-- Pagination -->
      <div
        v-if="!isLoading && yachts.length > 0"
        class="flex justify-center items-center space-x-4 mt-12"
      >
        <Button
          @click="searchParams.page > 1 && changePage(searchParams.page - 1)"
          :disabled="!data?.pagination.hasPrev"
          variant="outline"
          class="px-4 py-2"
        >
          Previous
        </Button>
        <span class="text-gray-600">Page {{ searchParams.page }}</span>
        <Button
          @click="changePage(searchParams.page + 1)"
          :disabled="!data?.pagination.hasNext"
          variant="outline"
          class="px-4 py-2"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import YachtCard from "~/components/builder/YachtCard.vue";
import type { Yacht } from "~/types/yacht";

// Search parameters
const searchParams = reactive({
  page: 1,
  limit: 18,
  total: 0,
  dataType: "charter",
  search: "",
  location: "",
  yachtType: "",
  minLength: "",
  maxLength: "",
  sortBy: "created_at",
  sortOrder: "desc",
});

// Length range helper
const lengthRange = ref("");

// Watch length range and update min/max
watch(lengthRange, (newRange) => {
  if (newRange) {
    const [min, max] = newRange.split("-");
    searchParams.minLength = min;
    searchParams.maxLength = max && max !== "+" ? max : "";
    if (newRange.includes("+")) {
      searchParams.minLength = newRange.replace("+", "");
      searchParams.maxLength = "";
    }
  } else {
    searchParams.minLength = "";
    searchParams.maxLength = "";
  }
});

// Initialize from URL params
const route = useRoute();
if (route.query) {
  for (const key of Object.keys(searchParams)) {
    if (route.query[key]) {
      (searchParams as any)[key] = route.query[key];
    }
  };

  // Set length range from URL params
  if (route.query.minLength && route.query.maxLength) {
    lengthRange.value = `${route.query.minLength}-${route.query.maxLength}`;
  } else if (route.query.minLength && !route.query.maxLength) {
    lengthRange.value = `${route.query.minLength}+`;
  }
}

// Yachts data
const yachts = ref<Yacht[]>([]);

// Build API URL with search parameters
const buildApiUrl = () => {
  const baseUrl = "https://ahoy-boats-api.ahoyclub.workers.dev/api/v1/yachts";
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value && value !== "") {
      params.set(key, value.toString());
    }
  };

  return `${baseUrl}?${params.toString()}`;
};

// Fetch yachts data
const {
  data,
  pending: isLoading,
  refresh,
} = await useAsyncData("yachtsData", () => $fetch(buildApiUrl()), {
  immediate: true,
  watch: [],
});

// Update yachts when data changes
watchEffect(() => {
  if (data.value?.data) {
    yachts.value = data.value.data;
  }
});

// Update search function
const updateSearch = async () => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value && value !== "") {
      params.set(key, value.toString());
    }
  };

  // Update URL
  await navigateTo(`/charter?${params.toString()}`, { replace: true });

  // Refresh data
  await refresh();
};

// Change page
const changePage = (newPage: number) => {
  console.log(searchParams.page)
  searchParams.page = newPage;
  updateSearch();
};

// Clear filters
const clearFilters = () => {
  searchParams.search = "";
  searchParams.location = "";
  searchParams.yachtType = "";
  searchParams.minLength = "";
  searchParams.maxLength = "";
  lengthRange.value = "";
  searchParams.page = 1;
  updateSearch();
};

// SEO
useHead({
  title: "Yacht Charters - Luxury Yacht Charter Listings",
  meta: [
    {
      name: "description",
      content:
        "Browse our extensive collection of luxury yachts available for charter. Find the perfect yacht for your next maritime adventure.",
    },
  ],
});
</script>
