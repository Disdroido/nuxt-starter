<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-light text-gray-900 mb-4">{{ title }}</h2>
        <p v-if="subtitle" class="text-xl text-gray-600 max-w-3xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Featured Testimonial -->
        <div
          v-if="testimonials[0]"
          class="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div class="flex items-start space-x-4">
            <img
              :src="testimonials[0].avatar"
              :alt="testimonials[0].name"
              class="w-16 h-16 rounded-full object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400 mr-3">
                  <Star v-for="i in 5" :key="i" class="w-5 h-5 fill-current" />
                </div>
                <span class="text-sm text-gray-500">{{
                  testimonials[0].location
                }}</span>
              </div>
              <blockquote class="text-lg text-gray-700 mb-4 leading-relaxed">
                "{{ testimonials[0].quote }}"
              </blockquote>
              <div>
                <div class="font-semibold text-gray-900">
                  {{ testimonials[0].name }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ testimonials[0].title }}
                </div>
                <div
                  v-if="testimonials[0].yacht"
                  class="text-xs text-blue-600 mt-1"
                >
                  Charter: {{ testimonials[0].yacht }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Testimonials -->
        <div class="space-y-6">
          <div
            v-for="testimonial in testimonials.slice(1, 3)"
            :key="testimonial.id"
            class="bg-white rounded-xl p-6 shadow-md"
          >
            <div class="flex items-center mb-3">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div class="flex-1">
                <div class="font-medium text-gray-900 text-sm">
                  {{ testimonial.name }}
                </div>
                <div class="text-xs text-gray-600">{{ testimonial.title }}</div>
              </div>
              <div class="flex text-yellow-400">
                <Star v-for="i in 5" :key="i" class="w-3 h-3 fill-current" />
              </div>
            </div>
            <blockquote class="text-sm text-gray-700 leading-relaxed">
              "{{ testimonial.quote }}"
            </blockquote>
            <div v-if="testimonial.yacht" class="text-xs text-blue-600 mt-2">
              Charter: {{ testimonial.yacht }}
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Testimonials -->
      <div
        v-if="testimonials.length > 3"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        <div
          v-for="testimonial in testimonials.slice(3)"
          :key="testimonial.id"
          class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <img
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div class="flex-1">
              <div class="font-medium text-gray-900 text-sm">
                {{ testimonial.name }}
              </div>
              <div class="text-xs text-gray-600">{{ testimonial.title }}</div>
            </div>
            <div class="flex text-yellow-400">
              <Star v-for="i in 5" :key="i" class="w-3 h-3 fill-current" />
            </div>
          </div>
          <blockquote class="text-sm text-gray-700 leading-relaxed mb-3">
            "{{ testimonial.quote }}"
          </blockquote>
          <div v-if="testimonial.yacht" class="text-xs text-blue-600">
            Charter: {{ testimonial.yacht }}
          </div>
        </div>
      </div>

      <!-- Trust Indicators -->
      <div class="mt-16 pt-12 border-t border-gray-200">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-light text-gray-900 mb-2">
              {{ stats.totalCharters }}+
            </div>
            <div class="text-sm text-gray-600">Successful Charters</div>
          </div>
          <div>
            <div class="text-3xl font-light text-gray-900 mb-2">
              {{ stats.rating }}
            </div>
            <div class="text-sm text-gray-600">Average Rating</div>
          </div>
          <div>
            <div class="text-3xl font-light text-gray-900 mb-2">
              {{ stats.repeatClients }}%
            </div>
            <div class="text-sm text-gray-600">Repeat Clients</div>
          </div>
          <div>
            <div class="text-3xl font-light text-gray-900 mb-2">
              {{ stats.experience }}+
            </div>
            <div class="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star } from "lucide-vue-next";

defineProps({
  title: {
    type: String,
    default: "What Our Clients Say",
  },
  subtitle: {
    type: String,
    default:
      "Discover why discerning travelers choose us for their luxury yacht charter experiences",
  },
  testimonials: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: "Sarah Johnson",
        title: "CEO, Johnson & Associates",
        location: "French Riviera",
        yacht: "Ocean Majesty",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
        quote:
          "Our week aboard the Ocean Majesty was absolutely extraordinary. Every detail was perfectly orchestrated, from the impeccable service to the breathtaking destinations. The crew went above and beyond to ensure our family had an unforgettable experience. We've already booked our next charter!",
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
      {
        id: 4,
        name: "David Thompson",
        title: "Real Estate Developer",
        location: "Balearic Islands",
        yacht: "Mediterranean Pearl",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
        quote:
          "An exceptional charter experience. The yacht was pristine and the crew was incredibly professional.",
      },
      {
        id: 5,
        name: "Lisa Anderson",
        title: "Fashion Designer",
        location: "Amalfi Coast",
        yacht: "Bella Vista",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
        quote:
          "Pure perfection. From booking to disembarkation, everything was seamlessly handled.",
      },
    ],
  },
  stats: {
    type: Object,
    default: () => ({
      totalCharters: "500",
      rating: "4.9",
      repeatClients: "85",
      experience: "15",
    }),
  },
});
</script>
