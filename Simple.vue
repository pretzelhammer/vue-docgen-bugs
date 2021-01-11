<template>
    <div>
        <slot />
        <slot name="namedSlot" />
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: '#112233',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'medium',
            validator: (size) => ['small', 'medium', 'large'].includes(size),
        }
    },
    methods: {
        emitEvents() {
            this.$emit('eventType1');
            this.$emit('eventType2', true);
            this.$emit('eventType3', 'string');
        },
    },
};
</script>