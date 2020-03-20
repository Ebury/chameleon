<template>
  <div class="ec-currency-input">

    <div v-if="label"> {{ label }} </div>
    <ec-dropdown class="ec-currency-input__currencies" />
    <ec-amount-input class="ec-currency-input__amount" />

  </div>
</template>

<script>
import EcDropdown from '../ec-dropdown';
import EcAmountInput from '../ec-amount-input';

export default {
  components: {
    EcDropdown,
    EcAmountInput,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
    },
    locale: {
      type: String,
    },
    label: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
  .ec-currency-input {
    display: flex;
    flex-direction: row;

    &__amount {
      border-radius: 0 0 50px 50px;
    }
  }
</style>
