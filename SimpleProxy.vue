<template>
    <simple v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import Simple from 'Simple.vue';

export default {
    inheritAttrs: false,

    components: {
        Simple,
    },
};
</script>
