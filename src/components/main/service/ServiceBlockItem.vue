<template>
    <UiFlex align-items="center" gap="g8">
        <UiText :class="$style.name">
            {{ name }}
        </UiText>
        <UiTooltipWrapper :disabled="value === valueSmall">
            <template #trigger>
                <UiText>
                    <a v-if="isLink" :href="value" target="_blank">
                        {{ valueSmall }}
                    </a>
                    <template v-else>
                        {{ valueSmall }}
                    </template>
                </UiText>
            </template>

            <UiTooltipContent>{{ value }}</UiTooltipContent>
        </UiTooltipWrapper>
        <UiFlex
            justify-content="center"
            align-items="center"
            radius="r8"
            :class="$style.copy"
            @click="copy(value)"
        >
            <SvgIcon width="24" height="24" icon-name="copy" />
        </UiFlex>
    </UiFlex>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
    SvgIcon,
    UiFlex,
    UiText,
    UiTooltipContent,
    UiTooltipWrapper,
} from '@/components/kit';
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
        value = `${value.slice(0, 18)}...${value.slice(value.length - 10, value.length)}`;
    }
    return value;
});
</script>

<style lang="scss" module>
    .name {
        min-width: 120px;
    }

    .copy {
        width: 40px;
        height: 40px;
        color: var(--color-text-default);
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
