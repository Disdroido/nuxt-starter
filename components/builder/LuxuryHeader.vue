<template>
  <header class="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <img :src="logoUrl" :alt="logoAlt" class="h-12 w-auto" />
            <div v-if="showCompanyName" class="flex flex-col">
              <span class="text-xl font-light text-gray-900">{{
                companyName
              }}</span>
              <span
                v-if="tagline"
                class="text-xs text-gray-500 uppercase tracking-wide"
                >{{ tagline }}</span
              >
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.id || link.label"
            :to="link.url || link.data?.url || '#'"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
          >
            {{ link.label || link.data?.label }}
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"
            ></span>
          </NuxtLink>
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center space-x-4">
          <Button
            v-if="showPhoneNumber && phoneNumber"
            variant="ghost"
            class="text-gray-700 hover:text-blue-600 flex items-center space-x-2"
          >
            <Phone class="w-4 h-4" />
            <span>{{ phoneNumber }}</span>
          </Button>

          <Button
            v-if="showInquireButton"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            @click="$emit('inquire')"
          >
            {{ inquireButtonText }}
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden flex items-center">
          <Button
            @click="showMobileMenu = !showMobileMenu"
            variant="ghost"
            class="p-2"
          >
            <Menu class="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Sheet v-model:open="showMobileMenu">
      <SheetContent side="right" class="w-full sm:w-80 p-0 bg-white">
        <div class="flex flex-col h-full">
          <!-- Mobile Header -->
          <div class="flex items-center justify-between p-6 border-b">
            <div class="flex items-center space-x-3">
              <img :src="logoUrl" :alt="logoAlt" class="h-10 w-auto" />
              <div v-if="showCompanyName">
                <div class="text-lg font-medium text-gray-900">
                  {{ companyName }}
                </div>
                <div
                  v-if="tagline"
                  class="text-xs text-gray-500 uppercase tracking-wide"
                >
                  {{ tagline }}
                </div>
              </div>
            </div>
            <SheetClose>
              <X class="w-5 h-5" />
            </SheetClose>
          </div>

          <!-- Mobile Navigation -->
          <nav class="flex-1 px-6 py-4 space-y-4">
            <NuxtLink
              v-for="link in navigationLinks"
              :key="link.id || link.label"
              :to="link.url || link.data?.url || '#'"
              class="block text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              @click="showMobileMenu = false"
            >
              {{ link.label || link.data?.label }}
            </NuxtLink>
          </nav>

          <!-- Mobile Actions -->
          <div class="p-6 border-t space-y-4">
            <Button
              v-if="showPhoneNumber && phoneNumber"
              variant="outline"
              class="w-full flex items-center justify-center space-x-2"
            >
              <Phone class="w-4 h-4" />
              <span>{{ phoneNumber }}</span>
            </Button>

            <Button
              v-if="showInquireButton"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              @click="
                $emit('inquire');
                showMobileMenu = false;
              "
            >
              {{ inquireButtonText }}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { fetchEntries } from "@builder.io/sdk-vue";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetClose } from "~/components/ui/sheet";
import { Menu, Phone, X } from "lucide-vue-next";

const props = defineProps({
  logoUrl: {
    type: String,
    default: "https://ahoyclub.com/logo/ahoy-club-logo-dark.svg",
  },
  logoAlt: {
    type: String,
    default: "Yacht Charter Exclusive",
  },
  companyName: {
    type: String,
    default: "Yacht Charter Exclusive",
  },
  tagline: {
    type: String,
    default: "Luxury Yacht Charters",
  },
  showCompanyName: {
    type: Boolean,
    default: true,
  },
  phoneNumber: {
    type: String,
    default: "+33 4 93 95 45 45",
  },
  showPhoneNumber: {
    type: Boolean,
    default: true,
  },
  showInquireButton: {
    type: Boolean,
    default: true,
  },
  inquireButtonText: {
    type: String,
    default: "Start Charter",
  },
  useBuilderNavigation: {
    type: Boolean,
    default: true,
  },
  customNavLinks: {
    type: Array,
    default: () => [
      { label: "Charter", url: "/charter" },
      { label: "Destinations", url: "/destinations" },
      { label: "Yachts", url: "/yachts" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
});

defineEmits(["inquire"]);

const showMobileMenu = ref(false);

// Navigation links from Builder.io or custom
const builderNavLinks = ref([]);

if (props.useBuilderNavigation) {
  const { data: navLinks } = await useAsyncData("builderDataNavLinks", () =>
    fetchEntries({
      model: "nav-link",
      apiKey: "25becc87cdbf4edab9eccb09d448af92",
    }),
  );
  builderNavLinks.value = navLinks.value || [];
}

const navigationLinks = computed(() => {
  return props.useBuilderNavigation && builderNavLinks.value.length
    ? builderNavLinks.value
    : props.customNavLinks;
});

// Watch for route changes to close mobile menu
const route = useRoute();
watch(
  () => route.path,
  () => {
    showMobileMenu.value = false;
  },
);
</script>
