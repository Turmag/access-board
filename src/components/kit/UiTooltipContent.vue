<template>
    <div :class="$style.container" :style="containerStyles">
        <UiText align="center">
            <slot />
        </UiText>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { UiText } from '@/components/kit';

interface IProps {
    padding?: string;
    width?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    padding: '10px 12px',
    width: 'auto',
});

const containerStyles = computed(() => ({
    padding: props.padding,
    width: props.width,
}));
</script>

<style module lang="scss">
    .container {
        border-radius: 4px !important;
        background: var(--background-color-default);
        text-align: center;
        word-break: break-word;
    }
</style>
