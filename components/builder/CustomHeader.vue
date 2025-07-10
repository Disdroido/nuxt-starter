<template>
  <header class="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <img
              :src="
                logoUrl || 'https://ahoyclub.com/logo/ahoy-club-logo-dark.svg'
              "
              :alt="logoAlt || 'Logo'"
              class="h-8 w-auto"
            />
            <span
              v-if="showCompanyName"
              class="text-xl font-bold text-gray-900"
            >
              {{ companyName || "Your Company" }}
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.id || link.label"
            :to="link.url || link.data?.url || '/'"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            :class="{
              'text-blue-600': isActiveLink(link.url || link.data?.url),
            }"
          >
            {{ link.label || link.data?.label }}
          </NuxtLink>
        </nav>

        <!-- Action Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <Button
            v-if="showLoginButton"
            variant="ghost"
            class="text-gray-700 hover:text-blue-600"
          >
            {{ loginButtonText || "Login" }}
          </Button>
          <Button
            v-if="showSignupButton"
            class="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {{ signupButtonText || "Sign Up" }}
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <Button
            @click="showMobileMenu = !showMobileMenu"
            variant="ghost"
            size="sm"
            class="p-2"
          >
            <Menu v-if="!showMobileMenu" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="showMobileMenu"
      class="md:hidden bg-white border-t border-gray-200 shadow-lg"
    >
      <div class="px-4 py-2 space-y-2">
        <NuxtLink
          v-for="link in navigationLinks"
          :key="link.id || link.label"
          :to="link.url || link.data?.url || '/'"
          class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
          :class="{
            'text-blue-600 bg-blue-50': isActiveLink(
              link.url || link.data?.url,
            ),
          }"
          @click="showMobileMenu = false"
        >
          {{ link.label || link.data?.label }}
        </NuxtLink>
        <div class="pt-4 pb-2 border-t border-gray-200 space-y-2">
          <Button
            v-if="showLoginButton"
            variant="ghost"
            class="w-full justify-start text-gray-700"
          >
            {{ loginButtonText || "Login" }}
          </Button>
          <Button
            v-if="showSignupButton"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {{ signupButtonText || "Sign Up" }}
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { fetchEntries } from '@builder.io/sdk-vue';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-vue-next';

interface Props {
  logoUrl?: string;
  logoAlt?: string;
  companyName?: string;
  showCompanyName?: boolean;
  showLoginButton?: boolean;
  showSignupButton?: boolean;
  loginButtonText?: string;
  signupButtonText?: string;
  useBuilderNavigation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showCompanyName: false,
  showLoginButton: true,
  showSignupButton: true,
  useBuilderNavigation: true,
});

const route = useRoute();
const showMobileMenu = ref(false);
const navigationLinks = ref([]);

// Default navigation links if not using Builder.io
const defaultLinks = [
  { id: '1', label: 'Home', url: '/' },
  { id: '2', label: 'About', url: '/about' },
  { id: '3', label: 'Services', url: '/services' },
  { id: '4', label: 'Contact', url: '/contact' },
];

// Fetch navigation from Builder.io or use default
if (props.useBuilderNavigation) {
  const { data: navLinks } = await useAsyncData('builderNavLinks', () =>
    fetchEntries({
      model: 'nav-link',
      apiKey: '25becc87cdbf4edab9eccb09d448af92',
    })
  );
  navigationLinks.value = navLinks.value || defaultLinks;
} else {
  navigationLinks.value = defaultLinks;
}

// Check if link is active
const isActiveLink = (url: string) => {
  if (!url) return false;
  return route.path === url || (url !== '/' && route.path.startsWith(url));
};

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    showMobileMenu.value = false;
  }
);
</script>
