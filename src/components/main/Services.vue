<template>
    <div :class="$style.servicesWrapper">
        <ServiceBlock
            v-for="(service, i) in filteredServices"
            :key="i"
            v-bind="service"
            :class="$style.block"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ServiceBlock from '@/components/main/ServiceBlock.vue';
import { mainStore } from '@/stores/main.store';
import type { IService } from '@shared/types';

const store = mainStore();

const filteredServices = computed((): IService[] =>
    store.services.filter(service => {
        const items = service.items;
        const isFiltered = service.name.toLowerCase().includes(store.filterWord.toLowerCase()) || items.some(item => item.value.toLowerCase().includes(store.filterWord.toLowerCase()));
        return isFiltered && store.selectedCategory
            ? service?.category?.includes(store.selectedCategory)
            : isFiltered;
    }),
);
</script>

<style lang="scss" module>
    .servicesWrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        @media screen and (width <= 1400px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (width <= 900px) {
            grid-template-columns: 1fr;
        }
    }

    .block {
        border-bottom: 1px solid #ddd;
    }
</style>
