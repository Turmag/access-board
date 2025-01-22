<template>
    <header :class="$style.header">
        <div :class="$style.text">
            Доступы к сервисам
        </div>
        <div :class="$style.switchWrapper">
            <Switch />
        </div>
        <SvgIcon
            v-if="authStoreVar.isAuthorized"
            :class="$style.exit"
            width="69"
            height="64"
            style="min-width: 69px;"
            icon-name="door"
            @click="exit"
        />
    </header>
</template>

<script setup lang="ts">
import SvgIcon from '../common/SvgIcon.vue';
import Switch from './Switch.vue';
import { authStore } from '@/stores/auth.store';

const authStoreVar = authStore();

const exit = () => authStoreVar.logout();
</script>

<style lang="scss" module>
    .header {
        display: flex;
        align-items: center;
        gap: 16px;
        max-width: 100%;
        height: 120px;
        padding: 30px 20px;
        border-bottom: 1px solid;
        box-shadow: 0 5px 8px 0 rgb(34 60 80 / 20%);
        background-color: var(--background-color);
    }

    .text {
        margin-top: -8px;
        color: var(--color);
        text-decoration: none;
        font-size: 32px;
        line-height: 36px;
    }

    .switchWrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .themeReset {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        color: var(--color);
        outline: none;
        cursor: pointer;
        user-select: none;
    }

    .exit {
        margin-left: auto;
        color: var(--color);
        cursor: pointer;
        user-select: none;
    }
</style>
