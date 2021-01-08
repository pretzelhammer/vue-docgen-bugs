<template>
    <div></div>
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
            this.$emit('eventType4', ['array']);
            this.$emit('eventType5', {type: 'object'});
        },
    },
};
</script>