<template>
    <Header />
    <UiLoader v-if="isAuthorizeChecking" />
    <Login v-else-if="!authStore.isAuthorized" />
    <Main v-else />
    <notifications :duration="5000" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Header from '@/components/header/Header.vue';
import { UiLoader } from '@/components/kit';
import Login from '@/components/Login.vue';
import Main from '@/components/main/Main.vue';
import { useScrollPosition } from '@/shared/composables/useScrollPosition';
import { useTheme } from '@shared/composables/useTheme';
import { useAuthStore } from '@/stores/useAuth.store';
import { useMainStore } from '@/stores/useMain.store';

const mainStore = useMainStore();
const authStore = useAuthStore();

const isAuthorizeChecking = ref(true);

const loadServices = async () => {
    if (authStore.isAuthorized && !mainStore.services.length) {
        await mainStore.getServices();
        mainStore.isLoadedPage = true;
    }
};

watch(
    () => authStore.isAuthorized,
    () => loadServices(),
);

const init = async () => {
    mainStore.setVariablesFromInject();
    useTheme();
    useScrollPosition();
    await authStore.checkAccessToken();
    isAuthorizeChecking.value = false;
};

init();
</script>
