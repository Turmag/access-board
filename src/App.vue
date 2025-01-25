<template>
    <Header />
    <Loader v-if="isAuthorizeChecking" />
    <Login v-else-if="!authStoreVar.isAuthorized" />
    <Main v-else />
    <notifications :duration="5000" />
</template>

<script setup lang="ts">
import { useTheme } from '@shared/useTheme';
import { ref, watch } from 'vue';
import Header from '@/components/header/Header.vue';
import Loader from '@/components/Loader.vue';
import Login from '@/components/Login.vue';
import Main from '@/components/main/Main.vue';
import { authStore } from '@/stores/auth.store';
import { useStore } from '@/stores/main.store';

interface IProps {
    darkModeName?: string;
    savedDarkModeName?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    darkModeName: 'isDarkModeAccessBoard',
    savedDarkModeName: 'isSavedDarkModeAccessBoard',
});

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
    store.darkModeName = props.darkModeName;
    store.savedDarkModeName = props.savedDarkModeName;
    useTheme(store);
    await authStoreVar.checkAuthorize();
    isAuthorizeChecking.value = false;

    if (authStoreVar.isAuthorized) store.getServices();
};

init();
</script>
