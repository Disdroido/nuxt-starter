<template>
  <div>
    <!-- Hero Section -->
    <LuxuryYachtHero
      title="Paradise awaits"
      subtitle="Discover the world's most exclusive yacht charters in the Mediterranean's most stunning destinations"
      primary-button-text="Explore Yachts"
      secondary-button-text="View Destinations"
      :show-search-form="true"
    />

    <!-- Featured Yachts -->
    <YachtCardsGrid
      title="Featured Yacht Charters"
      subtitle="Discover our handpicked selection of luxury yachts available for charter in the world's most exclusive destinations"
      :yachts="featuredYachts"
      :items-per-page="6"
      @view-yacht="viewYachtDetails"
      @inquire-yacht="inquireAboutYacht"
    />

    <!-- Destinations -->
    <DestinationsShowcase
      title="Discover Destinations"
      subtitle="Explore the world's most beautiful charter destinations with our curated selection of premium locations"
      :destinations="destinations"
      @select-destination="selectDestination"
      @view-all-destinations="viewAllDestinations"
    />

    <!-- Testimonials -->
    <LuxuryTestimonials
      title="What Our Clients Say"
      subtitle="Discover why discerning travelers choose us for their luxury yacht charter experiences around the world"
      :testimonials="testimonials"
      :stats="clientStats"
    />

    <!-- Call to Action -->
    <CTASection
      title="Ready to Set Sail?"
      subtitle="Experience the ultimate in luxury yacht charters. Our team of experts is ready to create your perfect maritime adventure."
      primary-button-text="Start Your Charter"
      secondary-button-text="Speak to an Expert"
    />
  </div>
</template>

<script setup lang="ts">
import LuxuryYachtHero from "~/components/builder/LuxuryYachtHero.vue";
import YachtCardsGrid from "~/components/builder/YachtCardsGrid.vue";
import DestinationsShowcase from "~/components/builder/DestinationsShowcase.vue";
import LuxuryTestimonials from "~/components/builder/LuxuryTestimonials.vue";
import CTASection from "~/components/builder/CTASection.vue";

// Fetch featured yachts from API
const { data: featuredYachtsData, pending: isLoadingYachts } = await useAsyncData(
  'featuredYachts',
  () => $fetch('https://ahoy-boats-api.ahoyclub.workers.dev/api/v1/yachts/featured'),
  { immediate: true }
)

// Transform API data to component format
const featuredYachts = computed(() => {
  if (!featuredYachtsData.value?.data) return fallbackYachts.value;

  return featuredYachtsData.value.data.map((item) => {
    const yacht = item.yacht || {}
    return {
      id: yacht.id,
      name: yacht.name || yacht.title,
      title: yacht.title,
      dataType: yacht.dataType || 'charter',
      newListing: yacht.newListing,
      bestBuy: yacht.bestBuy,
      sold: yacht.sold,
      mainImage: yacht.images?.[0],
      images: yacht.images,
      yearBuilt: yacht.yearBuilt,
      lengthMeters: yacht.specifications?.length?.toString(),
      price: yacht.charter?.weeklyRates?.[0]?.rate,
      weeklyPrice: yacht.charter?.weeklyRates?.[0]?.rate,
      currency: yacht.currency || '€',
      builder: yacht.builder,
      model: yacht.model,
      sleeps: yacht.specifications?.maxGuests || yacht.specifications?.guests,
      lying: yacht.location,
      description: yacht.description,
      amenities: Array.isArray(yacht.amenities) ? yacht.amenities : ['Luxury Interior', 'Professional Crew', 'Water Toys', 'WiFi'],
      broker: yacht.broker
    }
  })
})

// Fallback featured yachts data in case API fails
const fallbackYachts = ref([
  {
    id: '1',
    name: 'Ocean Majesty',
    title: 'Ocean Majesty',
    dataType: 'charter',
    newListing: true,
    bestBuy: false,
    sold: false,
    mainImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop'],
    yearBuilt: '2020',
    lengthMeters: '50',
    price: '45000',
    weeklyPrice: '45000',
    currency: '€',
    builder: 'Benetti',
    model: 'Custom',
    sleeps: 12,
    lying: 'French Riviera',
    description: 'Luxury motor yacht with exceptional amenities and professional crew.',
    amenities: ['Jacuzzi', 'Water Toys', 'Chef Included', 'WiFi'],
    broker: null
  },
  {
    id: '2',
    name: 'Serenity',
    title: 'Serenity',
    dataType: 'charter',
    newListing: false,
    bestBuy: true,
    sold: false,
    mainImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop'],
    yearBuilt: '2019',
    lengthMeters: '45',
    price: '38000',
    weeklyPrice: '38000',
    currency: '€',
    builder: 'Perini Navi',
    model: 'Custom',
    sleeps: 10,
    lying: 'Greek Islands',
    description: 'Elegant sailing yacht perfect for Mediterranean adventures.',
    amenities: ['Diving Equipment', 'Kayaks', 'Professional Crew'],
    broker: null
  },
  {
    id: '3',
    name: 'Azure Dream',
    title: 'Azure Dream',
    dataType: 'charter',
    newListing: false,
    bestBuy: false,
    sold: false,
    mainImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop'],
    yearBuilt: '2021',
    lengthMeters: '55',
    price: '52000',
    weeklyPrice: '52000',
    currency: '€',
    builder: 'Feadship',
    model: 'Custom',
    sleeps: 14,
    lying: 'Balearic Islands',
    description: 'Ultra-modern motor yacht with exceptional entertainment features.',
    amenities: ['Cinema Room', 'Gym', 'Spa', 'Helipad'],
    broker: null
  }
]);

// Destinations data
const destinations = ref([
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
    description: "Ancient history meets pristine beaches and turquoise seas",
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
    description: "Vibrant nightlife and secluded coves in the Mediterranean",
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
]);

// Testimonials data
const testimonials = ref([
  {
    id: 1,
    name: "Sarah Johnson",
    title: "CEO, Johnson & Associates",
    location: "French Riviera",
    yacht: "Ocean Majesty",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    quote:
      "Our week aboard the Ocean Majesty was absolutely extraordinary. Every detail was perfectly orchestrated, from the impeccable service to the breathtaking destinations. The crew went above and beyond to ensure our family had an unforgettable experience.",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Entrepreneur",
    location: "Greek Islands",
    yacht: "Serenity",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    quote:
      "Professional service and an incredible yacht. The Greek Islands have never looked more beautiful than from the deck of Serenity.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Investment Banker",
    location: "Caribbean",
    yacht: "Azure Dream",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    quote:
      "Luxury redefined. The attention to detail and personalized service exceeded all expectations. Highly recommended!",
  },
]);

// Client statistics
const clientStats = ref({
  totalCharters: "500",
  rating: "4.9",
  repeatClients: "85",
  experience: "15",
});

const viewYachtDetails = (yacht) => {
  console.log("View yacht:", yacht);
  navigateTo(`/yacht/${yacht.id}`);
};

const inquireAboutYacht = (yacht) => {
  console.log("Inquire about yacht:", yacht);
  // Handle yacht inquiry
};

const selectDestination = (destination) => {
  console.log("Select destination:", destination);
  navigateTo(`/destinations/${destination.id}`);
};

const viewAllDestinations = () => {
  navigateTo("/destinations");
};

// SEO
useHead({
  title: "Yacht Charter Exclusive - Luxury Yacht Charters | Paradise Awaits",
  meta: [
    {
      name: "description",
      content:
        "Discover the world's most exclusive yacht charters in the Mediterranean. Luxury yachts, professional crew, and unforgettable experiences await.",
    },
    {
      property: "og:title",
      content: "Yacht Charter Exclusive - Luxury Yacht Charters",
    },
    {
      property: "og:description",
      content:
        "Paradise awaits. Discover the world's most exclusive yacht charters in the Mediterranean's most stunning destinations.",
    },
    {
      property: "og:image",
      content:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
    },
  ],
});
</script>
