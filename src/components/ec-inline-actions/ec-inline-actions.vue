<template>
  <ec-popover v-bind="popoverOptions">
    <slot />
    <template
      v-for="(list, index) in items"
      slot="popover"
    >
      <ul
        :key="`${index}__list`"
        class="ec-inline-actions"
      >
        <li
          v-for="item in list"
          :key="item.text"
          v-ec-tooltip.left="item.tooltip"
          class="ec-inline-actions__item"
        >
          <button
            v-ec-close-popover="!item.disabled"
            class="ec-inline-actions__button"
            :class="item.disabled ? 'ec-inline-actions__button--disabled' : ''"
            :disabled="item.disabled"
            @click="item.action && item.action()"
          >
            <slot
              :name="`item-${item.name}`"
              :item="item"
            >
              <ec-icon
                v-if="item.icon"
                :name="item.icon"
                :size="24"
                :type="item.iconType ? item.iconType : null"
                class="ec-inline-actions__icon"
                :class="{ 'ec-inline-actions__icon--no-type': !item.iconType || item.disabled }"
              />
              <span>{{ item.text }}</span>
            </slot>
          </button>
        </li>
      </ul>
      <hr
        :key="`${index}__delimiter`"
        v-if="items.length !== index + 1"
        class="ec-inline-actions__delimiter"
      >
    </template>
  </ec-popover>
</template>

<script>
import EcPopover from '../ec-popover';
import EcClosePopover from '../../directives/ec-close-popover';
import EcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';

export default {
  components: { EcPopover, EcIcon },
  directives: { EcClosePopover, EcTooltip },
  props: {
    items: {
      type: Array,
      required: true,
    },
    popoverOptions: {
      type: Object,
      default: () => ({ offset: 10, placement: 'bottom-start' }),
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';

.ec-inline-actions {
  margin: 0;
  padding: 0;
  min-width: 160px;
  max-width: 320px;

  &__item {
    list-style: none;
    width: 100%;
  }

  &__button {
    text-align: left;
    width: 100%;
    background: $white;
    color: $level-3-body-and-headings;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 8px 16px;
    display: flex;
    align-items: center;

    &:hover {
      background: $level-7-backgrounds;
    }

    &--disabled {
      color: $level-6-disabled-lines;
      cursor: default;

      &:hover {
        background: $white;
      }
    }
  }

  &__delimiter {
    margin: 0;
    border: 0;
    border-top: 1px solid $level-6-disabled-lines;
  }

  &__icon {
    margin-right: 8px;
    flex-shrink: 0;

    &--no-type {
      fill: currentColor;
    }
  }
}
</style>
