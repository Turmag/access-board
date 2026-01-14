<template>
    <UiFlex
        justify-content="center"
        align-items="center"
        width="wfull"
        :class="$style.loader"
    >
        <SvgIcon
            :class="$style.img"
            :width="width"
            :height="width"
            viewBoxWidth="1024"
            viewBoxHeight="1024"
            icon-name="loader"
        />
    </UiFlex>
</template>

<script setup lang="ts">
import { SvgIcon, UiFlex } from '@/components/kit';

interface IProps {
    width?: number;
}

withDefaults(defineProps<IProps>(), { width: 70 });
</script>

<style lang="scss" module>
    .loader {
        height: calc(100% - 115px);
        color: var(--color-text-default);
    }

    .img {
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
</style>
