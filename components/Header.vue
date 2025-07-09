<template>
  <header>
    <nav>
      <a v-for="link in links" :href="link.data.url" :key="link.id">
        {{ link.data.label }}
      </a>
    </nav>
  </header>
</template>

<script setup>
import { fetchEntries } from '@builder.io/sdk-vue';

const links = ref([]);

const { data: navLinks } = await useAsyncData('builderDataNavLinks', () =>
  fetchEntries({
    model: 'nav-link',
    apiKey: '25becc87cdbf4edab9eccb09d448af92',
  })
);

links.value = navLinks.value || [];
</script>