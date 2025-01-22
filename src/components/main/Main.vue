<template>
    <main :class="$style.main">
        <Filters />
        <Services />
    </main>
</template>

<script setup lang="ts">
import Filters from '@/components/main/Filters.vue';
import Services from '@/components/main/Services.vue';
</script>

<style lang="scss" module>
    .main {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 20px;
    }
</style>
