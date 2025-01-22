<template>
    <div :class="$style.filters">
        <Filter />
        <CategoriesSelect />
    </div>
</template>

<script setup lang="ts">
import CategoriesSelect from '@/components/main/CategoriesSelect.vue';
import Filter from '@/components/main/Filter.vue';
</script>

<style lang="scss" module>
    .filters {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
    }
</style>
