<template>
    <div></div>
</template>

<script>
export default {
    model: {
        prop: 'checked',
        event: 'checked:update',
    },
    props: {
        checked: Boolean,
    },
    methods: {
        emitEvent() {
            this.$emit('checked:update', !this.checked);
        },
    },
};
</script>
