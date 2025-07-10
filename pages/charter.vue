<template>
  <div class="flex flex-wrap gap-4">
    <Button asChild v-for="data in yachts" :key="data.yacht.id">
      <NuxtLink :to="`/yacht/${data.yacht.id}`">
        {{ data.yacht.name }}
      </NuxtLink>
    </Button>
  </div>
</template>

<script lang="ts" setup>
const yachts = ref<any>([]);

const { data, pending: isLoading } = await useAsyncData(
  'yachtsData',
  () => $fetch("https://ahoy-boats-api.ahoyclub.workers.dev/api/v1/yachts?dataType=charter"),
  {
    immediate: true,
  }
);

watchEffect(() => {
  if (data.value) {
    yachts.value = data?.value?.data;
  }
});
</script>