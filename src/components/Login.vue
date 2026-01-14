<template>
    <UiFlex justify-content="center" align-items="center" padding="p20">
        <UiFlex
            direction="col"
            justify-content="center"
            gap="g8"
            width="wfull"
            padding-block="p40"
            radius="r4"
            bg="help"
            border-color="default"
            :class="$style.login"
        >
            <UiText size="fs24" :class="$style.title">
                Приветули!
            </UiText>
            <UiText :class="$style.description">
                Просто залогинься
            </UiText>
            <UiFlex justify-content="center">
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
            </UiFlex>
        </UiFlex>
    </UiFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    SvgIcon,
    UiFlex,
    UiText,
} from '@/components/kit';
import { useAuthStore } from '@/stores/useAuth.store.js';

const store = useAuthStore();

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
    .login {
        min-height: 100px;
        color: var(--color-text-default);
    }

    .title {
        text-align: center;
        line-height: 28px;
    }

    .description {
        margin-block: 20px;
        text-align: center;
        line-height: 20px;
    }

    .inputBox {
        position: relative;
        width: 300px;
        border-radius: 8px;
        background: var(--background-color-default);
    }

    .input {
        width: 250px;
        height: 40px;
        border-radius: 8px 0 0 8px;
        border: 1px solid var(--background-color-default);
        background: var(--background-color-default);
        color: var(--color-text-default);
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
        color: var(--color-text-default);
        cursor: pointer;
        user-select: none;
    }
</style>
