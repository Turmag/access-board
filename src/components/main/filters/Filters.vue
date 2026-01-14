<template>
    <UiFlex justify-content="space-between" gap="g8" wrap="wrap">
        <FiltersSearch />
        <FiltersCategoriesSelect />
    </UiFlex>
</template>

<script setup lang="ts">
import { UiFlex } from '@/components/kit';
import FiltersCategoriesSelect from '@/components/main/filters/FiltersCategoriesSelect.vue';
import FiltersSearch from '@/components/main/filters/FiltersSearch.vue';
</script>
