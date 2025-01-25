<template>
    <div :class="$style.wrapper">
        <VueMultiselect
            v-model="store.selectedCategory"
            :class="$style.select"
            :options="store.categories"
            :show-labels="false"
            :loading="isLoadingCategories"
            :disabled="isLoadingCategories"
            placeholder="Категория"
        >
            <template #noResult>
                -
            </template>
            <template #noOptions>
                -
            </template>
        </VueMultiselect>
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
import VueMultiselect from 'vue-multiselect';
import { ref } from 'vue';
import SvgIcon from '@/components/common/SvgIcon.vue';
import { useStore } from '@/stores/main.store';

const store = useStore();
const isLoadingCategories = ref(false);

const resetFilter = () => store.selectedCategory = '';
</script>

<style lang="scss" module>
    .wrapper {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 412px;
    }

    .select {
        min-width: 380px;
        max-width: 380px;
    }

    .cancel {
        color: var(--color);
        cursor: pointer;
        user-select: none;
    }
</style>

<style lang="scss">
    .multiselect__select {
        width: 20px;
        padding: 0;
    }

    .multiselect__input,
    .multiselect__single {
        font-size: 16px;
    }

    .multiselect__tags {
        padding: 8px 18px 0 10px;
        border-color: #aaa !important;
        background: var(--background-color);
    }

    .multiselect__placeholder {
        margin-bottom: 5px;
        font-size: 16px;
    }

    .multiselect__option {
        text-transform: capitalize;
    }

    .multiselect__option:not(.multiselect__option--selected, .multiselect__option--highlight) {
        background: var(--background-color);
        color: var(--color);
    }

    .multiselect__input,
    .multiselect__single,
    .multiselect__tags {
        background: var(--background-color) !important;
        color: var(--color) !important;
        text-transform: capitalize;
    }

    .multiselect__content-wrapper {
        &::-webkit-scrollbar {
            width: 15px;
            height: 15px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 15px;
            background: var(--color);
        }

        &::-webkit-scrollbar-track {
            border-radius: 15px;
            background: var(--background-color);
        }
    }
</style>
