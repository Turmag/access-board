<template>
    <UiFlex align-items="center" gap="g16">
        <input
            ref="inputRef"
            v-model="filterWord"
            :class="$style.filter"
            placeholder="Название"
            @input="onInput"
        >
        <SvgIcon
            :class="$style.cancel"
            width="20"
            height="20"
            :view-box-width="69"
            :view-box-height="69"
            icon-name="cancel"
            @click="resetFilter"
        />
    </UiFlex>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import {
    ref,
    useTemplateRef,
    watch,
} from 'vue';
import { SvgIcon, UiFlex } from '@/components/kit';
import { useMainStore } from '@/stores/useMain.store';

const store = useMainStore();

const filterWord = ref('');

const inputRef = useTemplateRef('inputRef');
const resetFilter = () => {
    store.filterWord = '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    inputRef.value?.focus();
};
const onInput = useDebounceFn(() => store.filterWord = filterWord.value, 500);

watch(
    () => store.filterWord,
    value => filterWord.value = value,
);
</script>

<style lang="scss" module>
    .filter {
        width: 380px;
        height: 40px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--background-color-default);
        border: 1px solid #aaa;
        background: var(--background-color-default);
        color: var(--color-text-default);
        font-family: Inter, Verdana, Geneva, Tahoma, sans-serif;
        font-size: 16px;

        &::placeholder {
            color: #adadad;
        }
    }

    .cancel {
        color: var(--color-text-default);
        cursor: pointer;
        user-select: none;
    }
</style>
