<template>
    <span
        :class="[
            $style.text,
            $style[weight],
            $style[color],
            $style[size],
            $style[wrap],
            $style[`display-${display}`],
        ]"
    >
        <slot>{{ text }}</slot>
    </span>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';

withDefaults(defineProps<{
    color?: 'default';
    display?: 'block' | 'inline' | 'flex' | '';
    size?: 'fs12' | 'fs14' | 'fs16' | 'fs18' | 'fs20' | 'fs24' | 'fs32' | 'fs36';
    text?: string | number | Ref<string, string>;
    weight?: 'fw400' | 'fw500' | 'fw600' | 'fw700';
    wrap?: 'nowrap' | 'balance' | '';
}>(), {
    color: 'default',
    cursor: '',
    display: '',
    size: 'fs16',
    text: '',
    weight: 'fw400',
    wrap: '',
});
</script>

<style module lang="scss">
    .text {
        line-height: 100%;
    }

    .block {
        display: block;
    }

    $text-colors: default;

    @each $color in $text-colors {
        .#{$color} {
            color: var(--color-text-#{$color});
        }
    }

    $sizes: 12, 14, 16, 18, 20, 24, 32, 36;

    @each $size in $sizes {
        .fs#{$size} {
            font-size: #{$size}px;
        }
    }

    $weights: 400, 500, 600, 700;

    @each $weight in $weights {
        .fw#{$weight} {
            font-weight: #{$weight};
        }
    }

    $displays: block, inline, flex;

    @each $display in $displays {
        .display-#{$display} {
            display: #{$display};
        }
    }

    .nowrap {
        white-space: nowrap;
    }

    .balance {
        text-wrap: balance;
    }
</style>
