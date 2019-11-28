<template>
  <div class="ec-tabs">
    <ul class="ec-tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.index"
        class="ec-tabs__header-item"

        :class="{'ec-tabs__header-item-active': tab.isActive}"
        @click="makeActive(index)"
      >
        <slot :name="tab.headerSlotName" />
      </li>
    </ul>

    <main class="ec-tabs__main">
      <transition name="ec-tabs__fade">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          v-show="tab.isActive"
          :class="{isActive: tab.isActive}"
        >
          <slot
            :name="tab.mainSlotName"
          />
        </div>
      </transition></main>
  </div>
</template>

<script>
export default {
  name: 'EcSubmenu',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    makeActive(index) {
      for (const tab of this.tabs) {
        tab.isActive = false;
      }
      this.tabs[index].isActive = true;
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/index';

.ec-tabs {
  padding: 5px;
  margin: 5px;

  &__header {
    overflow: auto;
    display: flex;
    min-width: 100px;
    border-bottom: 1px solid black;
  }

  &__header-item {
    padding: 16px 16px 0 16px;
    text-align: center;
    cursor: pointer;
  }

  &__header-item-active {
    border: 1px solid black;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  // &__content {
  // }

  // &__content-panel {
  // }

  &__fade {
    @include fade-transition;
  }
}
</style>
