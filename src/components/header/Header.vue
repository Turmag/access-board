<template>
    <UiFlex
        align-items="center"
        gap="g16"
        padding-block="p32"
        padding-inline="p20"
        bg="default"
        tag="header"
        :class="$style.header"
    >
        <UiText size="fs32" :class="$style.text">
            Доступы к сервисам
        </UiText>
        <UiFlex align-items="center" gap="g4">
            <HeaderSwitch />
        </UiFlex>
        <SvgIcon
            v-if="authStoreVar.isAuthorized"
            :class="$style.exit"
            width="69"
            height="64"
            style="min-width: 69px;"
            icon-name="door"
            @click="exit"
        />
    </UiFlex>
</template>

<script setup lang="ts">
import HeaderSwitch from '@/components/header/HeaderSwitch.vue';
import {
    SvgIcon,
    UiFlex,
    UiText,
} from '@/components/kit';
import { useAuthStore } from '@/stores/useAuth.store';

const authStoreVar = useAuthStore();

const exit = () => authStoreVar.logout();
</script>

<style lang="scss" module>
    .header {
        max-width: 100%;
        height: 120px;
        border-bottom: 1px solid;
        box-shadow: 0 5px 8px 0 rgb(34 60 80 / 20%);
    }

    .text {
        margin-top: -8px;
        line-height: 36px;
    }

    .exit {
        margin-left: auto;
        color: var(--color-text-default);
        cursor: pointer;
        user-select: none;
    }
</style>
