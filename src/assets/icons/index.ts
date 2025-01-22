import type { DefineComponent } from 'vue';
import Cancel from './Cancel.vue';
import Copy from './Copy.vue';
import Door from './Door.vue';
import Eye from './Eye.vue';
import EyeCrossed from './EyeCrossed.vue';
import Loader from './Loader.vue';
import Reset from './Reset.vue';
type TIcons = Record<string, DefineComponent>; 

export default {
'cancel': Cancel,
'copy': Copy,
'door': Door,
'eye': Eye,
'eye-crossed': EyeCrossed,
'loader': Loader,
'reset': Reset,
} as unknown as TIcons;