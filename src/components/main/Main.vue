<template>
    <UiFlex
        direction="col"
        gap="g16"
        padding="p20"
        tag="main"
    >
        <Filters />
        <Services />
    </UiFlex>
</template>

<script setup lang="ts">
import { UiFlex } from '@/components/kit';
import Filters from '@/components/main/filters/Filters.vue';
import Services from '@/components/main/service/Services.vue';
</script>
