<template>
    <div :class="$style.wrapper">
        <input
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
    </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { ref, watch } from 'vue';
import SvgIcon from '@/components/common/SvgIcon.vue';
import { mainStore } from '@/stores/main.store';

const store = mainStore();

const filterWord = ref('');

const resetFilter = () => store.filterWord = '';
const onInput = useDebounceFn(() => store.filterWord = filterWord.value, 500);

watch(
    () => store.filterWord,
    value => filterWord.value = value,
);
</script>

<style lang="scss" module>
    .wrapper {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .filter {
        width: 380px;
        height: 40px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--background-color);
        border: 1px solid #aaa;
        background: var(--background-color);
        color: var(--color);
        font-family: Inter, Verdana, Geneva, Tahoma, sans-serif;
        font-size: 16px;

        &::placeholder {
            color: #adadad;
        }
    }

    .cancel {
        color: var(--color);
        cursor: pointer;
        user-select: none;
    }
</style>
