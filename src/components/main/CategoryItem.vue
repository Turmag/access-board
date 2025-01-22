<template>
    <div :class="$style.category">
        <div :class="$style.name">
            Категория
        </div>
        <div :class="$style.value">
            {{ category }}
        </div>
    </div>
</template>

<script setup lang="ts">
interface IProps {
    category: string;
}

defineProps<IProps>();
</script>

<style lang="scss" module>
    .category {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--color);
    }

    .name {
        min-width: 120px;
    }

    .value {
        font-weight: 600;
    }
</style>
