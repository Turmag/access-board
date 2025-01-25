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
import { useTheme } from '@shared/composables/useTheme';
import { authStore } from '@/stores/auth.store';
import { useStore } from '@/stores/main.store';

const store = useStore();
const authStoreVar = authStore();

const isAuthorizeChecking = ref(true);

watch(
    () => authStoreVar.isAuthorized,
    value => {
        if (value && !store.services.length) store.getServices();
    },
);

const init = async () => {
    useTheme();
    await authStoreVar.checkAuthorize();
    isAuthorizeChecking.value = false;

    if (authStoreVar.isAuthorized) store.getServices();
};

init();
</script>
