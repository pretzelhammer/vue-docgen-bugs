<template>
    <input v-bind="$attrs" v-on="$listeners">
</template>

<script>
export default {
    inheritAttrs: false,
};
</script>