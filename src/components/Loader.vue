<template>
    <div :class="$style.loader">
        <SvgIcon
            :class="$style.img"
            :width="width"
            :height="width"
            viewBoxWidth="1024"
            viewBoxHeight="1024"
            icon-name="loader"
        />
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/common/SvgIcon.vue';

defineProps({
    width: {
        default: 70,
        type: Number,
    },
});
</script>

<style lang="scss" module>
    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 115px);
        color: var(--color);
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
