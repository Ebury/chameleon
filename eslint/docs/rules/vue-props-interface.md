# Props TS interface should be defined properly in .vue and types.ts file. (`vue-props-interface`)

We have to place equal interface definition in `<script setup lang="ts">` and in `types.ts` file.
This is because `defineProps<SomePropsInterface>()` notation must use SomePropsInterface declared inside
the `<script setup lang="ts">`, but in this case we can't export this interface to use it
in our codebase. Hence, we should have exactly the same interface exported in `types.ts` file. 
This rule is aimed to check whether interfaces in `types.ts` and `<script setup lang="ts">` are the same.

## Rule Details

Examples of **incorrect** code for this rule. 
Take note of the `isTextInline` property in `RadioButtonProps` within `script` and `types.ts`, and see if you can spot a difference:

```typescript
<script setup lang="ts">

  interface RadioButtonProps {
  value: string,
  modelValue?: string,
  label?: string,
  description?: string,
  isDisabled?: boolean,
  isTextInline: boolean,
  name?: string,
  errorMessage?: string,
  hasError?: boolean
}

  const props = defineProps<RadioButtonProps>();
</script>
```
In `types.ts` that should be placed in the same folder as `.vue` file.
```typescript
export enum RadioButtonEvent {
  UPDATE_MODEL_VALUE = 'update:modelValue',
}

export interface RadioButtonEvents {
  [RadioButtonEvent.UPDATE_MODEL_VALUE]: RadioButtonProps['modelValue']
}

export interface RadioButtonProps {
  value: string,
  modelValue?: string,
  label?: string,
  description?: string,
  isDisabled?: boolean,
  isTextInline?: boolean,
  name?: string,
  errorMessage?: string,
  hasError?: boolean
}
```
This following code is incorrect because `<script>` lang is `ts`, and in this case `defineProps` must be typed by interface.
```typescript
<script setup lang="ts">
  const props = defineProps({
    value: {
      type: string,
    },
  });
</script>
```

Examples of **correct** code for this rule:

```typescript
<script setup lang="ts">
  interface RadioButtonProps {
  value: string,
    modelValue?: string,
    label?: string,
    description?: string,
    isDisabled?: boolean,
    isTextInline?: boolean,
    name?: string,
    errorMessage?: string,
    hasError?: boolean
}

const props = defineProps<RadioButtonProps>();
</script>
```
