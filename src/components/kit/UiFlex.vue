<template>
    <component
        :is="tag"
        :class="[
            $style.container,
            $style[height],
            $style[width],
            $style[radius],
            $style[`position-${position}`],
            $style[`direction-${direction}`],
            $style[`align-items-${alignItems}`],
            $style[`align-content-${alignContent}`],
            $style[`align-self-${alignSelf}`],
            $style[`justify-items-${justifyItems}`],
            $style[`justify-content-${justifyContent}`],
            $style[`justify-self-${justifySelf}`],
            $style[`wrap-${wrap}`],
            $style[`gap-${gap}`],
            $style[`column-gap-${colGap}`],
            $style[`row-gap-${rowGap}`],
            $style[`padding-${padding}`],
            $style[`padding-inline-${paddingInline}`],
            $style[`padding-block-${paddingBlock}`],
            $style[`bg-${bg}`],
            $style[`border-${borderColor}`],
            {
                [$style.grow]: !!grow,
            }
        ]"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    alignContent?: '' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'normal' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: '' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    alignSelf?: '' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'auto';
    bg?: '' | 'default' | 'help';
    borderColor?: '' | 'default';
    colGap?: '' | 'g2' | 'g4' | 'g6' | 'g8' | 'g10' | 'g12' | 'g16' | 'g20' | 'g24' | 'g28' | 'g32' | 'g36' | 'g40' | 'g48' | 'g56' | 'g60' | 'g64' | 'g80' | 'g120';
    direction?: '' | 'col' | 'reverse' | 'col-reverse';
    gap?: '' | 'g2' | 'g4' | 'g6' | 'g8' | 'g10' | 'g12' | 'g16' | 'g20' | 'g24' | 'g28' | 'g32' | 'g36' | 'g40' | 'g48' | 'g56' | 'g60' | 'g64' | 'g80' | 'g120';
    grow?: boolean;
    height?: '' | 'hfull';
    justifyContent?: '' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'normal' | 'space-between' | 'space-around' | 'space-evenly';
    justifyItems?: '' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
    justifySelf?: '' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'auto';
    padding?: '' | 'p2' | 'p4' | 'p6' | 'p8' | 'p10' | 'p12' | 'p14' | 'p16' | 'p18' | 'p20' | 'p24' | 'p28' | 'p32' | 'p36' | 'p40' | 'p42' | 'p64' | 'p80' | 'p120';
    paddingBlock?: '' | 'p2' | 'p4' | 'p6' | 'p8' | 'p10' | 'p12' | 'p14' | 'p16' | 'p18' | 'p20' | 'p24' | 'p28' | 'p32' | 'p36' | 'p40' | 'p42' | 'p64' | 'p80' | 'p120';
    paddingInline?: '' | 'p2' | 'p4' | 'p6' | 'p8' | 'p10' | 'p12' | 'p14' | 'p16' | 'p18' | 'p20' | 'p24' | 'p28' | 'p32' | 'p36' | 'p40' | 'p42' | 'p64' | 'p80' | 'p120';
    position?: '' | 'relative' | 'absolute' | 'sticky';
    radius?: '' | 'r0' | 'r2' | 'r4' | 'r6' | 'r8' | 'r12' | 'r14' | 'r16' | 'r18' | 'r20' | 'r22' | 'r24' | 'r26' | 'r28' | 'r30' | 'r32';
    rowGap?: '' | 'g2' | 'g4' | 'g6' | 'g8' | 'g10' | 'g12' | 'g16' | 'g20' | 'g24' | 'g28' | 'g32' | 'g36' | 'g40' | 'g42' | 'g48' | 'g56' | 'g60' | 'g64' | 'g80' | 'g120';
    tag?: string;
    width?: '' | 'wfull';
    wrap?: '' | 'nowrap' | 'wrap' | 'wrap-reverse';
}>(), {
    alignContent: '',
    alignItems: '',
    alignSelf: '',
    bg: '',
    borderColor: '',
    colGap: '',
    direction: '',
    gap: '',
    grow: false,
    height: '',
    justifyContent: '',
    justifyItems: '',
    justifySelf: '',
    padding: '',
    paddingBlock: '',
    paddingInline: '',
    position: '',
    radius: 'r0',
    rowGap: '',
    tag: 'div',
    width: '',
    wrap: '',
});

const indent: Record<string, string> = {};
const gapSizes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 42, 48, 56, 60, 64, 80, 120];
gapSizes.forEach(size => {
    indent[`p${size}`] = `${size}px`;
    indent[`g${size}`] = `${size}px`;
});
</script>

<style module lang="scss">
    .container {
        display: flex;
    }

    $directions: (
        "col": column,
        "reverse": row-reverse,
        "col-reverse": column-reverse,
    );

    @each $key, $value in $directions {
        .direction-#{$key} {
            flex-direction: #{$value};
        }
    }

    .hfull {
        height: 100%;
    }

    .wfull {
        width: 100%;
    }

    $positions: relative, absolute, sticky;

    @each $position in $positions {
        .position-#{$position} {
            position: #{$position};
        }
    }

    $align-items: flex-start, flex-end, center, baseline, stretch;

    @each $align-item in $align-items {
        .align-items-#{$align-item} {
            align-items: #{$align-item};
        }
    }

    $align-content-items: flex-start, flex-end, center, baseline, stretch, normal, space-between, space-around, space-evenly;

    @each $align-content-item in $align-content-items {
        .align-content-#{$align-content-item} {
            align-content: #{$align-content-item};
        }
    }

    $align-self-items: flex-start, flex-end, center, baseline, stretch, auto;

    @each $align-self-item in $align-self-items {
        .align-self-#{$align-self-item} {
            align-self: #{$align-self-item};
        }
    }

    $justify-items: flex-start, flex-end, center, stretch;

    @each $justify-item in $justify-items {
        .justify-item-#{$justify-item} {
            justify-items: #{$justify-item};
        }
    }

    $justify-content-items: flex-start, flex-end, center, stretch, normal, space-between, space-around, space-evenly;

    @each $justify-content-item in $justify-content-items {
        .justify-content-#{$justify-content-item} {
            justify-content: #{$justify-content-item};
        }
    }

    $justify-self-items: flex-start, flex-end, center, stretch, auto;

    @each $justify-self-item in $justify-self-items {
        .justify-self-#{$justify-self-item} {
            justify-self: #{$justify-self-item};
        }
    }

    $wraps: nowrap, wrap, wrap-reverse;

    @each $wrap in $wraps {
        .wrap-#{$wrap} {
            flex-wrap: #{$wrap};
        }
    }

    @for $i from 0 to 120 {
        $value: $i * 2;

        .r#{$value} {
            border-radius: #{$value}px;
        }

        .gap-g#{$value} {
            gap: #{$value}px;
        }

        .column-gap-g#{$value} {
            column-gap: #{$value}px;
        }

        .row-gap-g#{$value} {
            row-gap: #{$value}px;
        }

        .padding-p#{$value} {
            padding: #{$value}px;
        }

        .padding-inline-p#{$value} {
            padding-inline: #{$value}px;
        }

        .padding-block-p#{$value} {
            padding-block: #{$value}px;
        }
    }

    .grow {
        flex-grow: 1;
    }

    $bg-colors: default, help;

    @each $color in $bg-colors {
        .bg-#{$color} {
            background-color: var(--background-color-#{$color});
        }
    }

    $border-colors: default;

    @each $color in $border-colors {
        .border-#{$color} {
            border: 1px solid;
            border-color: var(--color-border-#{$color});
        }
    }
</style>
