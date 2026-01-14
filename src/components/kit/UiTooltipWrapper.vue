<template>
    <div :class="[inline && $style.inline]">
        <div ref="trigger" :class="$style.trigger">
            <slot name="trigger" />
        </div>

        <div ref="content" @click="handleContentClick">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
// oxlint-disable no-unused-expressions
import { tippy } from 'vue-tippy';
import {
    onBeforeUnmount,
    onMounted,
    ref,
    useTemplateRef,
    watch,
} from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOOLTIP_POSITIONS = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
] as const;

export type TTooltipPosition = typeof TOOLTIP_POSITIONS[number];

interface IProps {
    action?: 'mouseenter' | 'click' | 'manual';
    appendTo?: HTMLElement | Element | string;
    arrow?: boolean;
    delay?: number[];
    disabled?: boolean;
    duration?: number[];
    // INFO: перенос тултипа если не влезает во вьюпорт
    flip?: boolean;
    hideOnClick?: boolean;
    inline?: boolean;
    // INFO: true для отключения эмитов click-outside при клике на контент тултипа
    interactive?: boolean;
    interactiveBorder?: number;
    maxWidth?: number;
    offset?: number[];
    placement?: TTooltipPosition;
    theme?: 'light' | 'dark';
    zIndex?: number;
}

const props = withDefaults(defineProps<IProps>(), {
    action: 'mouseenter',
    appendTo: () => document.body,
    arrow: true,
    delay: () => [0, 0],
    disabled: false,
    duration: () => [500, 500],
    flip: true,
    hideOnClick: false,
    inline: false,
    interactive: false,
    interactiveBorder: 2,
    maxWidth: 350,
    // INFO: смещение стрелки от центра тултипа, расстояние от триггера
    offset: () => [0, 10],
    placement: 'top',
    theme: 'light',
    zIndex: 9999,
});

interface IEmits {
    (event: 'change', value: boolean): void;
    (event: 'click-outside'): void;
    (event: 'hide'): void;
}

const emits = defineEmits<IEmits>();

const visible = defineModel<boolean>();

// eslint-disable-next-line vue/require-typed-ref
const instance = ref();
const content = useTemplateRef('content');
const trigger = useTemplateRef('trigger');
const initTippy = () => {
    // @ts-expect-error triggerType
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    instance.value = tippy(trigger.value, {
        animation: 'shift-toward',
        appendTo: props.appendTo,
        arrow: props.arrow,
        content: content.value,
        delay: props.delay,
        duration: props.duration,
        hideOnClick: props.hideOnClick,
        interactive: props.interactive,
        interactiveBorder: props.interactiveBorder,
        maxWidth: props.maxWidth,
        offset: props.offset,
        onClickOutside: () => {
            emits('click-outside');
        },
        onHide: () => {
            emits('change', false);
            emits('hide');
        },
        onShow: () => {
            emits('change', true);
        },
        placement: props.placement,
        popperOptions: {
            modifiers: [
                {
                    enabled: props.flip,
                    name: 'flip',
                },
            ],
        },
        theme: props.theme,
        trigger: props.action,
        zIndex: props.zIndex,
    });

    initVisible();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    props.disabled && instance.value.disable();
};

const initVisible = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (visible.value) instance.value.show();
};

const handleContentClick = () => {
    if (props.hideOnClick && props.interactive) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        instance.value.hide();
    }
};

watch(
    () => visible.value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    value => value ? instance.value.show() : instance.value.hide(),
);

watch(
    () => [props.arrow, props.placement, props.appendTo],
    () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        instance.value.destroy();
        initTippy();
    },
);

watch(
    () => props.disabled,

    value => {
        if (!instance.value) return;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        value ? instance.value.disable() : instance.value.enable();
    },
);

watch(
    () => props.action,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    value => instance.value && instance.value.setProps({ trigger: value }),
);

onMounted(() => {
    initTippy();
});

onBeforeUnmount(() => {
    if (instance.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        instance.value.destroy();
    }
});
</script>

<style lang="scss" module>
    .inline {
        display: inline-block;
        vertical-align: middle;
    }

    .trigger {
        display: flex;
    }
</style>

<style lang="scss">
    .tippy-box {
        background-color: transparent;
        box-shadow: var(--shadow-m);
    }

    .tippy-content {
        padding: 0;
    }

    .tippy-arrow {
        color: var(--background-color-default);
    }
</style>
