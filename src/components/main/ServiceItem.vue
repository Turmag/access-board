<template>
    <div :class="$style.item">
        <div :class="$style.name">
            {{ name }}
        </div>
        <div>
            <a v-if="isLink" :href="value" target="_blank">
                {{ valueSmall }}
            </a>
            <template v-else>
                {{ valueSmall }}
            </template>
        </div>
        <div :class="$style.copy" @click="copy(value)">
            <SvgIcon width="24" height="24" icon-name="copy" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@/components/kit';
import { computed } from 'vue';
import { copy } from '@shared/helpers';

interface IProps {
    isLink?: boolean;
    name: string;
    value: string;
}

const props = defineProps<IProps>();

const valueSmall = computed(() => {
    let value = props.value;
    if (value.length > 40) {
        value = `${value.slice(0, 20)}...${value.slice(value.length - 10, value.length)}`;
    }
    return value;
});
</script>

<style lang="scss" module>
    .item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--color-text-default);
    }

    .name {
        min-width: 120px;
    }

    .copy {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: var(--background-color-help);
        }

        &:active {
            background-color: var(--color-border-default);
        }
    }
</style>
