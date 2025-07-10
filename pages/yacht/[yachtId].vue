<template>
  <div>
    <div v-if="pending">
      <div class="flex items-center justify-center h-screen">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
    <div v-else class="min-h-screen bg-gray-50">
      <Navigation />
      
      <div class="pt-20 pb-4 px-4">
        <div class="max-w-7xl mx-auto">
          <NuxtLink 
            :to="yacht?.dataType === 'sales' ? '/sales' : '/charter'"
            class="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            Back to {{yacht?.dataType === 'sales' ? 'Sales' : 'Charter'}}
          </NuxtLink>
        </div>
      </div>

      <section class="relative">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div class="lg:col-span-2">
              <div class="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  :src="yacht?.images?.[selectedImageIndex]"
                  :alt="`${yacht?.name || yacht?.title}`"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge v-if="yacht?.newListing" class="bg-green-500 hover:bg-green-600 text-white">New Listing</Badge>
                  <Badge v-if="yacht?.bestBuy" class="bg-orange-500 hover:bg-orange-600 text-white">Best Buy</Badge>
                  <Badge v-if="yacht?.sold" class="bg-red-500 hover:bg-red-600 text-white">Sold</Badge>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  class="absolute top-4 right-4"
                >
                  <Share2 class="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div v-if="yacht?.images?.length > 1" class="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <button
                v-for="(image, index) in yacht?.images?.slice(1, 5)"
                :key="index + 1"
                @click="selectedImageIndex = index + 1"
                :class="`relative h-32 lg:h-24 rounded-lg overflow-hidden transition-all 
                ${ selectedImageIndex === index + 1 ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                }`"
              >
                <img
                  :src="image"
                  :alt="`${yacht?.name || yacht?.title} ${index + 2}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-12">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
              <div class="bg-white rounded-2xl p-8 shadow-lg">
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h1 class="text-4xl font-bold text-gray-900 mb-2">{{yacht?.name || yacht?.title}}</h1>
                    <div class="flex items-center gap-2">
                      <p class="text-xl text-gray-600">{{yacht?.builder}}</p>
                      <span v-if="yacht?.model" class="text-gray-400">•</span>
                      <p v-if="yacht?.model" class="text-xl text-gray-600">{{yacht?.model}}</p>
                      <span class="text-gray-400">•</span>
                      <p class="text-xl text-gray-600">{{yacht?.yearBuilt}}</p>
                    </div>
                  </div>
                  <Badge :variant="yacht?.dataType === 'sales' ? 'default' : 'secondary'" class="text-sm">
                    {{yacht?.dataType === 'sales' ? 'For Sale' : 'Charter'}}
                  </Badge>
                </div>

                <div v-if="yacht?.description" class="mb-8">
                  <!-- <YachtDescriptionAccordion :description="yacht?.description" previewLength="200" /> -->
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div class="text-center">
                    <Ruler class="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div class="font-semibold text-gray-900">{{formatLength(yacht?.lengthMeters)}}</div>
                    <div class="text-sm text-gray-500">Length</div>
                  </div>
                  <div v-if="yacht?.guests" class="text-center">
                    <Users class="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div class="font-semibold text-gray-900">{{yacht.guests}}</div>
                    <div class="text-sm text-gray-500">Guests</div>
                  </div>
                  <div v-if="yacht?.crew" class="text-center">
                    <Users class="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div class="font-semibold text-gray-900">{{yacht.crew}}</div>
                    <div class="text-sm text-gray-500">Crew</div>
                  </div>
                    <div v-if="yacht?.cabins" class="text-center">
                      <Calendar class="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div class="font-semibold text-gray-900">{{yacht.cabins}}</div>
                      <div class="text-sm text-gray-500">Cabins</div>
                    </div>
                </div>

                <Separator class="my-8" />

                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-if="yacht?.beam" class="flex justify-between">
                      <span class="text-gray-600">Beam:</span>
                      <span class="font-medium">{{yacht.beam}}m</span>
                    </div>
                    <div v-if="yacht?.draftLength" class="flex justify-between">
                      <span class="text-gray-600">Draft:</span>
                      <span class="font-medium">{{yacht.draftLength}}m</span>
                    </div>
                    <div v-if="yacht?.engines" class="flex justify-between">
                      <span class="text-gray-600">Engines:</span>
                      <span class="font-medium">{{yacht.engines}}</span>
                    </div>
                    <div v-if="yacht?.cruisingSpeed" class="flex justify-between">
                      <span class="text-gray-600">Cruising Speed:</span>
                      <span class="font-medium">{{yacht.cruisingSpeed}} knots</span>
                    </div>
                    <div v-if="yacht?.maxSpeedNumber" class="flex justify-between">
                      <span class="text-gray-600">Max Speed:</span>
                      <span class="font-medium">{{yacht.maxSpeedNumber}} knots</span>
                    </div>
                    <div v-if="yacht?.range" class="flex justify-between">
                      <span class="text-gray-600">Range:</span>
                      <span class="font-medium">{{yacht.range}} nm</span>
                    </div>
                    <div v-if="yacht?.yachtType" class="flex justify-between">
                      <span class="text-gray-600">Type:</span>
                      <span class="font-medium">{{yacht.yachtType}}</span>
                    </div>
                    <div v-if="yacht?.category" class="flex justify-between">
                      <span class="text-gray-600">Category:</span>
                      <span class="font-medium">{yacht.category}</span>
                    </div>
                  </div>
                </div>

                <div v-if="yacht?.dataType === 'charter' && yacht?.amenities?.length > 0">
                  <Separator class="my-8" />
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Amenities</h3>
                    <div class="flex flex-wrap gap-2">
                      <!-- {yacht.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">{amenity}</Badge>
                      ))} -->
                    </div>
                  </div>
                </div>

                <div v-if="yacht?.dataType === 'charter' && yacht?.toys">
                  <Separator class="my-8" />
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Water Toys</h3>
                    <div class="text-gray-700">
                      {{yacht.toys}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="text-center mb-6">
                  <div class="text-3xl font-bold text-gray-900 mb-2">
                    {{yacht?.dataType === 'sales' 
                      ? formatPrice(yacht.price)
                      : yacht?.rates?.weekly 
                        ? `${formatPrice(yacht.rates.weekly)}/week`
                        : 'Rates on request'
                    }}
                  </div>
                  <div v-if="yacht?.rates?.season" class="text-gray-500">{{yacht.rates.season}} season</div>
                </div>

                <div v-if="yacht?.location" class="flex items-center justify-center mb-6 text-gray-600">
                  <MapPin class="h-4 w-4 mr-2" />
                  <span>{{yacht.location}}</span>
                </div>

                <Button class="w-full mb-4" size="lg">
                  {{yacht?.dataType === 'sales' ? 'Request Information' : 'Request Charter Quote'}}
                </Button>

                <div v-if="yacht?.broker">
                  <Separator class="my-6" />
                  <!-- <div>
                    <h4 class="font-semibold text-gray-900 mb-3">
                      {yacht.dataType === 'sales' ? 'Listing Broker' : 'Charter Specialist'}
                    </h4>
                    <div class="space-y-2">
                      <div class="font-medium">{yacht.broker.name}</div>
                      {yacht.broker.company && (
                        <div class="text-gray-600">{yacht.broker.company}</div>
                      )}
                      {yacht.broker.position && (
                        <div class="text-gray-500 text-sm">{yacht.broker.position}</div>
                      )}
                      {yacht.broker.phone && (
                        <div class="flex items-center text-sm text-gray-600">
                          <Phone class="h-4 w-4 mr-2" />
                          <span>{yacht.broker.phone}</span>
                        </div>
                      )}
                      {yacht.broker.email && (
                        <div class="flex items-center text-sm text-gray-600">
                          <Mail class="h-4 w-4 mr-2" />
                          <span>{yacht.broker.email}</span>
                        </div>
                      )}
                      {yacht.broker.location && (
                        <div class="flex items-center text-sm text-gray-600">
                          <MapPin class="h-4 w-4 mr-2" />
                          <span>{yacht.broker.location}</span>
                        </div>
                      )}
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <div v-if="similarYachts?.yachts && similarYachts.yachts.length > 0">
        <section class="py-12 bg-white">
          <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Similar Yachts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarYachts.yachts.slice(0, 4).map((similarYacht) => (
                <YachtCard key={similarYacht.id} yacht={similarYacht} />
              ))}
            </div>
          </div>
        </section>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Share2 } from 'lucide-vue-next';

  const yachtId = useRoute().params.yachtId;
  const yacht = ref<any>({});
  const selectedImageIndex = ref(0);
  const pending = ref(false);
  const route = useRoute();

const { data, pending: isLoading } = await useAsyncData(
  'yachtData',
  () => $fetch(`https://ahoy-boats-api.ahoyclub.workers.dev/api/v1/yachts/${yachtId}`),
  {
    immediate: true,
    watch: [yachtId]
  }
);

watchEffect(() => {
  if (data.value) {
    yacht.value = data?.value?.data?.yacht;
    pending.value = isLoading.value;
  }
});

  // const images = yacht.value?.images;

  const formatPrice = (price?: string | number) => {
    if (!price) return 'Price on request';
    
    let numPrice: number;
    if (typeof price === 'string') {
      numPrice = Number.parseFloat(price.replace(/[^\d.]/g, ''));
    } else {
      numPrice = price;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: yacht?.currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const formatLength = (lengthMeters: string | number) => {
    const meters = typeof lengthMeters === 'string' ? Number.parseFloat(lengthMeters) : lengthMeters;
    const feet = Math.round(meters * 3.28084);
    return `${meters}m (${feet}ft)`;
  };

  useHead({
    title: yacht.value?.name,
    meta: [
      { name: 'description', content: yacht.value?.description },
      { name: 'og:title', content: yacht.value?.name },
      { name: 'og:description', content: yacht.value?.description },
      { name: 'og:image', content: yacht.value?.images[0] },
    ]
  })
</script>