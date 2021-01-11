<template>
    <simple v-bind="$attrs" v-on="$listeners">
        <template
            v-for="(_, slot) of $slots"
            #[slot]
        >
            <slot :name="slot" />
        </template>
    </simple>
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
