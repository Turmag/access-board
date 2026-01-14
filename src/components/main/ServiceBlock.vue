<template>
    <div :class="$style.block">
        <div :class="$style.header">
            {{ name }}
        </div>
        <CategoryItem v-if="category" :category="category" />
        <Item v-for="(item, i) in items" :key="i" v-bind="item" />
    </div>
</template>

<script setup lang="ts">
import CategoryItem from '@/components/main/CategoryItem.vue';
import Item from '@/components/main/ServiceItem.vue';
import type { IServiceItem } from '@shared/types';

interface IProps {
    category?: string;
    items?: IServiceItem[];
    name: string;
}

defineProps<IProps>();
</script>

<style lang="scss" module>
    .block {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-block: 32px;
    }

    .header {
        margin-bottom: 20px;
        color: var(--color-text-default);
        font-size: 20px;
        font-weight: 600;
    }
</style>
