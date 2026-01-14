<template>
    <UiFlex direction="col" gap="g8" padding-block="p32">
        <UiText size="fs20" weight="fw600" :class="$style.header">
            {{ name }}
        </UiText>
        <ServiceCategory v-if="category" :category="category" />
        <ServiceBlockItem v-for="(item, i) in items" :key="i" v-bind="item" />
    </UiFlex>
</template>

<script setup lang="ts">
import { UiFlex, UiText } from '@/components/kit';
import ServiceBlockItem from '@/components/main/service/ServiceBlockItem.vue';
import ServiceCategory from '@/components/main/service/ServiceCategory.vue';
import type { IServiceItem } from '@shared/types';

interface IProps {
    category?: string;
    items?: IServiceItem[];
    name: string;
}

defineProps<IProps>();
</script>

<style lang="scss" module>
    .header {
        margin-bottom: 20px;
    }
</style>
