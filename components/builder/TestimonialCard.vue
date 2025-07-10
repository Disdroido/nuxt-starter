<template>
  <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div class="flex items-start space-x-4">
      <img
        :src="
          avatar ||
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
        "
        :alt="name || 'Customer'"
        class="w-12 h-12 rounded-full object-cover"
      />
      <div class="flex-1">
        <div class="flex items-center mb-2">
          <div class="flex text-yellow-400">
            <svg
              v-for="i in 5"
              :key="i"
              class="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
        </div>
        <blockquote class="text-gray-700 mb-4 italic">
          "{{
            quote ||
            "This product has completely transformed how we work. The results have been outstanding and exceeded all our expectations."
          }}"
        </blockquote>
        <div>
          <div class="font-semibold text-gray-900">
            {{ name || "John Doe" }}
          </div>
          <div class="text-sm text-gray-500">
            {{ title || "CEO, Company Name" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  quote?: string;
  name?: string;
  title?: string;
  avatar?: string;
}

defineProps<Props>();
</script>
