<template>
  <NuxtLink
    :to="`/yacht/${yacht?.id}`"
    class="group relative overflow-hidden bg-white transition-all border border-black/5 flex flex-col h-full"
    :class="variant === 'featured' 
      ? 'rounded-2xl !shadow-xl hover:shadow-2xl duration-500 transform hover:scale-[1.02]'
      : 'rounded-xl !shadow-lg hover:shadow-xl duration-300 transform hover:scale-[1.01]'"
  >
    <!-- Yacht Image -->
    <div class="relative h-56 overflow-hidden flex-shrink-0">
      <img
        :src="
          yacht?.mainImage ||
          yacht?.images?.[0] ||
          'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop'
        "
        :alt="yacht?.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
      <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
        <Badge v-if="yacht?.newListing" class="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">New</Badge>
        <Badge v-if="yacht?.bestBuy" class="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1">Best Buy</Badge>
        <Badge v-if="yacht?.sold" class="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">Sold</Badge>
        <Badge :variant="yacht?.sold ? 'destructive' : yacht?.dataType === 'sales' ? 'default' : 'secondary'" class="text-xs px-2 py-1">
          {{yacht?.dataType === 'sales' ? 'For Sale' : 'Charter'}}
        </Badge>
      </div>
      <!-- Price Badge -->
      <div class="absolute bottom-3 left-3 text-white">
        <div class="text-xl font-bold drop-shadow-lg">
          {{ formatPrice(yacht?.currency, yacht?.price, yacht?.weeklyPrice) }}
        </div>
      </div>
    </div>

    <!-- Yacht Details -->
    <div class="relative p-6 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-3">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {{yacht?.name || yacht?.title}}
          </h3>
          <div class="flex items-center gap-2 mt-1">
            <p class="text-gray-600 font-medium text-sm">{{yacht?.builder}}</p>
            <div v-if="yacht?.model">
              <span class="text-gray-400 text-sm">•</span>
              <p class="text-gray-500 text-sm truncate">{{yacht?.model}}</p>
            </div>
          </div>
        </div>
        <span v-if="yacht?.yearBuilt" class="text-sm text-gray-500 font-medium ml-2 flex-shrink-0">{{yacht?.yearBuilt}}</span>
      </div>
      
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="flex items-center gap-1.5 text-sm text-gray-600">
          <Ruler class="h-4 w-4 text-gray-400" />
          <span class="truncate">{{formatLength(yacht?.lengthMeters)}}</span>
        </div>
        <div v-if="yacht?.sleeps" class="flex items-center gap-1.5 text-sm text-gray-600">
          <Users class="h-4 w-4 text-gray-400" />
          <span>{{yacht?.sleeps}} guests</span>
        </div>
        <div v-if="yacht?.lying" class="flex items-center gap-1.5 text-sm text-gray-600 col-span-2">
          <MapPin class="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span class="truncate">{{yacht?.lying}}</span>
        </div>
      </div>

      <div v-if="yacht?.description" class="mb-4">
        <p class="text-sm text-gray-600 leading-relaxed">
          {{truncateDescription(yacht?.description)}}
        </p>
      </div>

      <div v-if="yacht?.dataType === 'charter' && yacht?.termToysAndTender && yacht?.termToysAndTender.length > 0" class="flex flex-wrap gap-1 mb-4">
        <Badge v-for="(amenity, index) in yacht?.termToysAndTender.filter(item => !['Tender', 'Tenders'].includes(item.split('::')[0])).map(item => item.split('::')[1]).slice(0, 2)" :key="index" variant="outline" class="text-xs py-0.5 px-2">
          {{amenity}}
        </Badge>
        <Badge v-if="yacht?.termToysAndTender.length > 2" variant="outline" class="text-xs py-0.5 px-2">
          +{{yacht?.termToysAndTender.length - 2}} more
        </Badge>
      </div>

      <div class="mt-auto pt-2 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <span class="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
            View Details →
          </span>
          <span v-if="yacht?.broker" class="text-xs text-gray-500 truncate max-w-24">
            {{yacht?.broker.company || yacht?.broker.name}}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  import { MapPin, Ruler, Users } from "lucide-vue-next";
  import type { Yacht } from "~/types/yacht";

  const props = defineProps<{ yacht: Yacht, variant: string }>();

  const formatPrice = (currency, price, weeklyPrice) => {
    if (!price && !weeklyPrice) return "Price on request";
    if (price !== null && price !== 0 && typeof price === 'number') {
      return `${currency !== 'unknown' ? currency : 'AUD'} ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    if (weeklyPrice !== null && weeklyPrice !== '0.00' && typeof weeklyPrice === 'string') {
      return `${currency !== 'unknown' ? currency : 'AUD'} ${weeklyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/week`;
    }
    return "Price on request";
  };

  const formatLength = (lengthString: string) => {
    if (!lengthString) return "Length not specified";
    const lengthMeters = Number.parseFloat(lengthString);
    const feet = Math.round(lengthMeters * 3.28084);
    return `${lengthMeters}m (${feet}ft)`;
  };

  const truncateDescription = (description: string, maxLength: number = 120) => {
    if (!description) return "";
    const cleanText = description.replace(/<[^>]*>/g, '').trim();
    if (cleanText.length <= maxLength) return cleanText;
    
    const truncated = cleanText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return `${truncated.substring(0, lastSpace)}...`;
  };
</script>