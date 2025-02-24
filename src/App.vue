<template>
    <Header />
    <Loader v-if="isAuthorizeChecking" />
    <Login v-else-if="!authStoreVar.isAuthorized" />
    <Main v-else />
    <notifications :duration="5000" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Header from '@/components/header/Header.vue';
import Loader from '@/components/Loader.vue';
import Login from '@/components/Login.vue';
import Main from '@/components/main/Main.vue';
import { useScrollPosition } from '@/shared/composables/useScrollPosition';
import { useTheme } from '@shared/composables/useTheme';
import { authStore } from '@/stores/auth.store';
import { mainStore } from '@/stores/main.store';

const store = mainStore();
const authStoreVar = authStore();

const isAuthorizeChecking = ref(true);

const loadServices = async () => {
    if (authStoreVar.isAuthorized && !store.services.length) {
        await store.getServices();
        store.isLoadedPage = true;
    }
};

watch(
    () => authStoreVar.isAuthorized,
    () => loadServices(),
);

const init = async () => {
    store.setVariablesFromInject();
    useTheme();
    useScrollPosition();
    await authStoreVar.checkAuthorize();
    isAuthorizeChecking.value = false;
};

init();
</script>
