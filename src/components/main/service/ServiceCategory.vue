<template>
    <UiFlex align-items="center" gap="g8">
        <UiText :class="$style.name">
            Категория
        </UiText>
        <UiText weight="fw600">
            {{ category }}
        </UiText>
    </UiFlex>
</template>

<script setup lang="ts">
import { UiFlex, UiText } from '@/components/kit';

interface IProps {
    category: string;
}

defineProps<IProps>();
</script>

<style lang="scss" module>
    .name {
        min-width: 120px;
    }
</style>
