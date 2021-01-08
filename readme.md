## vue docgen bugs

### doesn't parse model

[An issue](https://github.com/vue-styleguidist/vue-styleguidist/issues/654) was already made [and resolved](https://github.com/vue-styleguidist/vue-styleguidist/pull/672) and yet it still does not work.


Parsing:

**ExplicitVModel.vue**
```vue
<template>
    <div></div>
</template>

<script>
export default {
    model: {
        prop: 'checked',
        event: 'checked:update',
    },
};
</script>
```

Produces:

**ExplicitVModel.parsed.json**
```json
{
    "exportName": "default",
    "displayName": "ExplicitVModel",
    "description": "",
    "tags": {}
}
```

Where is the `model` data?

Same thing if the `v-model` is implicit instead of explicit. Parsing:

**ImplicitVModel.vue**
```vue
<template>
    <input v-bind="$attrs" v-on="$listeners">
</template>

<script>
export default {
    inheritAttrs: false,
};
</script>
```

Produces:

**ImplicitVModel.parsed.json**
```json
{
    "exportName": "default",
    "displayName": "ImplicitVModel",
    "description": "",
    "tags": {}
}
```

Again no `model` data.

### doesn't understand proxy components

Take this file for example:

**Simple.vue**
```vue
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
```

It's parsed as such:

**Simple.parsed.json**
```json
{
    "exportName": "default",
    "displayName": "Simple",
    "description": "",
    "tags": {},
    "props": [
        {
            "name": "color",
            "type": {
                "name": "string"
            },
            "defaultValue": {
                "func": false,
                "value": "'#112233'"
            }
        },
        {
            "name": "disabled",
            "type": {
                "name": "boolean"
            },
            "defaultValue": {
                "func": false,
                "value": "false"
            }
        },
        {
            "name": "size",
            "type": {
                "name": "string"
            },
            "defaultValue": {
                "func": false,
                "value": "'medium'"
            },
            "values": [
                "small",
                "medium",
                "large"
            ]
        }
    ],
    "events": [
        {
            "name": "eventType1"
        },
        {
            "name": "eventType2",
            "type": {
                "names": [
                    "undefined"
                ]
            }
        },
        {
            "name": "eventType3",
            "type": {
                "names": [
                    "undefined"
                ]
            }
        },
        {
            "name": "eventType4",
            "type": {
                "names": [
                    "undefined"
                ]
            }
        },
        {
            "name": "eventType5",
            "type": {
                "names": [
                    "undefined"
                ]
            }
        }
    ]
}
```

However if we have a component that does nothing other than proxying its attributes, props, and listeners to a child component:

**SimpleProxy.vue**
```vue
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
```

Then it's parsed as such:

**SimpleProxy.parsed.json**
```json
{
    "exportName": "default",
    "displayName": "SimpleProxy",
    "description": "",
    "tags": {}
}
```

I would expect **Simple.vue** and **SimpleProxy.vue** to have the exact same parsed output, at least in terms of documenting the valid attributes, props, and events.

### generating parsed output

Run:

```bash
npm run parse VUE_FILE_PATH
```

And a `{filename}.parsed.json` will be generated.

Examples:

```bash
npm run parse ExplicitVModel.vue # generates ExplicitVModel.parsed.json
npm run parse ImplicitVModel.vue # generates ImplicitVModel.parsed.json
npm run parse Simple.vue # generates Simple.parsed.json
npm run parse SimpleProxy.vue # generates SimpleProxy.parsed.json
```
