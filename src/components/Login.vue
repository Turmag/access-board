<template>
    <div :class="$style.wrapper">
        <div :class="$style.login">
            <div :class="$style.title">
                Приветули!
            </div>
            <div :class="$style.description">
                Просто залогинься
            </div>
            <div :class="$style.inputWrapper">
                <div :class="$style.inputBox">
                    <input
                        v-model="password"
                        placeholder="введи сюда"
                        maxlength="20"
                        :type="!eyeState ? 'text' : 'password'"
                        :class="$style.input"
                        @keyup.enter="authorize"
                    >
                    <SvgIcon
                        :class="$style.icon"
                        width="24"
                        height="24"
                        :icon-name="eyeState ? 'eye' : 'eye-crossed'"
                        @click="toggleEye"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from '@/components/common/SvgIcon.vue';
import { authStore } from '@/stores/auth.store.js';

const store = authStore();

const isLoading = ref(false);
const password = ref('');

const eyeState = ref(true);
const toggleEye = () => eyeState.value = !eyeState.value;

const authorize = async () => {
    if (isLoading.value || !password.value) {
        return;
    }

    isLoading.value = true;
    await store.login(password.value);
    isLoading.value = false;
};
</script>

<style lang="scss" module>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .login {
        display: flex;
        justify-content: center;
        gap: 8px;
        width: 100%;
        min-height: 100px;
        padding-block: 40px;
        border-radius: 5px;
        border: 1px solid var(--help-background-border);
        background-color: var(--help-background-color);
        color: var(--color);
        flex-direction: column;
    }

    .title {
        text-align: center;
        font-size: 24px;
        line-height: 28px;
    }

    .description {
        margin-block: 20px;
        text-align: center;
        font-size: 16px;
        line-height: 20px;
    }

    .inputWrapper {
        display: flex;
        justify-content: center;
    }

    .inputBox {
        position: relative;
        width: 300px;
        border-radius: 8px;
        background: var(--background-color);
    }

    .input {
        width: 250px;
        height: 40px;
        border-radius: 8px 0 0 8px;
        border: 1px solid var(--background-color);
        background: var(--background-color);
        color: var(--color);
        text-align: center;
        font-family: Inter, Verdana, Geneva, Tahoma, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;

        & ::placeholder {
            color: #b1acac;
        }
    }

    .icon {
        position: absolute;
        top: calc(50% - 12px);
        right: 5px;
        color: var(--color);
        cursor: pointer;
        user-select: none;
    }
</style>
