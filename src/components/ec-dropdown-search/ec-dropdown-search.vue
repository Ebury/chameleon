<template>
  <div class="ec-dropdown main-menu__header__account-selector main-menu__header__account">
    <div
      class="ec-dropdown-search"
      @blur="show = false"
    >
      <a
        href
        class="ec-dropdown-toggle ec-dropdown-toggle--menu"
        data-toggle="ec-dropdown"
        aria-haspopup="true"
        @click.prevent="show = !show"
      >
        <span class="title">{{ user.clientName }}</span>
      </a>
      <ul
        ref="scrollbar"
        v-if="show"
        class="ec-scrollbar ec-dropdown-menu ec-show"
      >
        <li
          v-if="showSearch"
          :class="`ec-dropdown-item ec-dropdown-input`"
        >
          <i :class="`ec-ico ec-ico-search ec-input-icon`" />
          <input
            v-model="searchText"
            :placeholder="placeholder"
            @input="hideTooltipsAndAddInteractionHuha()"
            @focus="addInteractionHuhaTask()"
          >
        </li>

        <li
          v-for="item in list"
          :key="item[itemFormat.id]"
          :class="['ec-dropdown-item ec-ellipsis', addDisabledClass(item)]"
          :data-id="item[itemFormat.id]"
          @click="selectItem(item)"
        >{{ item[itemFormat.text] }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { remove as removeDiacritics } from 'diacritics';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/tooltip';
import Huha from '@ebury/huha';
import * as Scrollbar from 'perfect-scrollbar';

export default {
  name: 'EcDropdownSearch',

  props: {
    user: {
      type: Object,
      required: true,
    },
    defaultItemSelected: {
      type: Object,
      default: () => null,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    itemFormat: {
      type: Object,
      default: () => ({
        id: 'id',
        text: 'text',
        disabled: 'disabled',
        disabledReason: 'disabledReason',
      }),
    },
    placeholder: {
      type: String,
      default: 'Search...',
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    tooltipContainer: {
      type: [HTMLElement, String],
      default: () => 'body',
    },
    tooltipPosition: {
      type: String,
      default: 'top',
      validator: (value) => {
        const placement = ['auto', 'top', 'bottom', 'left', 'right'];

        return placement.indexOf(value) > -1;
      },
    },
    huhaTaskName: {
      type: String,
      default: null,
    },
    huhaTrackOnIntercom: {
      type: Boolean,
      default: false,
    },
    huhaTrackOnGoogleAnalytics: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
      searchText: '',
      selected: this.defaultItemSelected,
      scrollbarInit: true,
    };
  },

  computed: {
    list() {
      return this.search();
    },
  },

  watch: {
    list() {
      this.$nextTick(() => {
        this.setUpTooltips();
        this.updateScrollbar();
      });
    },
  },

  created() {
    this.huhaInitialize();
  },

  mounted() {
    if (this.show) {
      this.setUpTooltips();
      this.setUpScrollbar();
    } else {
      this.observerShowClass();
    }
  },

  methods: {
    /**
     * Returns class name 'ec-disabled' if item has text in property disabled
     * @param item {Object}
     * @returns {string} Class name
     */
    addDisabledClass(item) {
      if (item[this.itemFormat.disabled]) {
        return 'ec-disabled';
      }
      return '';
    },

    /**
     * Returns if element property offsetWidth is greater than scrollWidth
     * @param el {HTMLElement}
     * @returns {boolean}
     */
    isActiveEllipsis(el) {
      return el.offsetWidth < el.scrollWidth;
    },

    /**
     * Initialize huha
     */
    huhaInitialize() {
      if (this.huhaTaskName) {
        this.huha = new Huha({
          trackOnGoogleAnalytics: this.huhaTrackOnGoogleAnalytics,
          trackOnIntercom: this.huhaTrackOnIntercom,
        });
      }
    },

    /**
     * Check if exists huha task
     */
    existsHuhaTask() {
      return this.huhaTaskName && this.huhaTask;
    },

    /**
     * Create the huha task
     */
    createHuhaTask() {
      if (this.huhaTaskName && !this.huhaTask) {
        this.huhaTask = this.huha.createTask(this.huhaTaskName);
      }
    },

    /**
     * Add an interaction to the huha task
     */
    addInteractionHuhaTask() {
      if (this.existsHuhaTask()) {
        this.huhaTask.addInteraction();
      }
    },

    /**
     * Add an error to the huha task
     */
    addErrorHuhaTask() {
      if (this.existsHuhaTask()) {
        this.huhaTask.addError();
      }
    },

    /**
     * Complete the huha task
     */
    completeHuhaTask() {
      if (this.existsHuhaTask()) {
        this.huhaTask.complete();
        this.huhaTask = null;
      }
    },

    /**
     * Abandon the huha task
     */
    abandonHuhaTask() {
      if (this.existsHuhaTask()) {
        this.huhaTask.abandon();
        this.huhaTask = null;
      }
    },

    /**
     * Use for optimize component when bootstrap add the class 'show'
     */
    observerShowClass() {
      // const config = { attributes: true, attributeOldValue: true, attributeFilter: ['class'] };
      // const observer = new MutationObserver((muts) => {
      //   let el = muts[0].target;
      //   if (el.classList.contains(`ec-show`) && muts[0].oldValue.indexOf(`ec-show`) === -1) {
      //     this.createHuhaTask();
      //     this.setUpTooltips();
      //     if (this.scrollbarInit) {
      //       this.scrollbarInit = false;
      //       this.setUpScrollbar();
      //     }
      //   } else if (
      //     !el.classList.contains(`ec-show`) &&
      //     muts[0].oldValue.indexOf(`ec-show`) !== -1
      //   ) {
      //     this.abandonHuhaTask();
      //   }
      // });
      // observer.observe(this.$el.querySelector(`.ec-dropdown-menu`), config);
    },

    /**
     * Action when select item
     * @param item {Object}
     */
    selectItem(item) {
      if (!item[this.itemFormat.disabled]) {
        // completed action
        this.addInteractionHuhaTask();

        this.selected = item;
        this.$emit('item-selected', item);
      } else {
        this.addErrorHuhaTask();
      }

      this.completeHuhaTask();
    },

    /**
     * Returns a list of items searched with diacritics in the name of items
     * @returns {Array} List of items
     */
    search() {
      return this.items.filter((item) => {
        const itemText = removeDiacritics(
          item[this.itemFormat.text].toLowerCase(),
        );
        const searchText = removeDiacritics(this.searchText.toLowerCase());

        return itemText.indexOf(searchText) > -1;
      });
    },

    /**
     * Initialize scrollbar
     */
    setUpScrollbar() {
      const element = this.$refs.scrollbar;
      Scrollbar.initialize(element);
    },

    /**
     * Initialize/set tooltips
     */
    setUpTooltips() {
      this.list.forEach((item) => {
        const el = this.$el.querySelector(
          `[data-id='${item[this.itemFormat.id]}']`,
        );

        this.toggleTooltip(true, el, item);
      });
    },

    /**
     * Turn on/off bootstrap tooltip for the element with item conditions
     * @param on {boolean}
     * @param el {HTMLElement}
     * @param item {Object}
     */
    toggleTooltip(on, el, item) {
      if (on && el && item) {
        let title = '';

        if (item[this.itemFormat.disabled]) {
          title = (this.isActiveEllipsis(el)
            ? `${item[this.itemFormat.text]}<br/>`
            : '') + item[this.itemFormat.disabledReason];
        } else if (this.isActiveEllipsis(el)) {
          title = item[this.itemFormat.text];
        }
        $(el).tooltip({
          container: this.tooltipContainer,
          placement: this.tooltipPosition,
          html: true,
          title,
        });
      } else {
        // $(this.$el)
        //   .find(`.ec-dropdown-item`)
        //   .tooltip('dispose');
      }
    },

    /**
     * Update scrollbar
     */
    updateScrollbar() {
      // const element = this.$refs.scrollbar;
      // Scrollbar.update(element);
    },

    /**
     * Hide tooltips and add interaction to huha
     */
    hideTooltipsAndAddInteractionHuha() {
      this.addInteractionHuhaTask();
      this.toggleTooltip(false);
    },
  },
};
</script>

<style lang="scss">
// stylelint-disable selector-class-pattern, selector-max-class

.ec-dropdown {
  width: 100%;
}

.ec-dropdown-search {
  position: relative;
}

.ec-dropdown-menu {
  position: absolute;
  transform: translate3d(0, 31px, 0) translate(-50%, 0);
  top: 0;
  left: 50%;
  width: 100%;
}

.dropdown-menu {
  // 5 items (Search input + 4 items)
  max-height: 205px;
}

.dropdown-input {
  position: relative;
  padding: 0.5rem 1rem;
  border-bottom: 0;
  cursor: default;

  &:active,
  &:hover {
    background-color: transparent;
  }
}

.dropdown-item.disabled {
  cursor: default;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: calc(50% - 0.5em);
}

input {
  outline: none;
  border: none;
  padding-left: 1.5rem;
  width: 100%;
}

.ec .main-menu .main-menu__header .main-menu__header__user-account {
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  transition: 0.5s;
  width: 100%;
  text-align: center;
}

.ec .main-menu .main-menu__header .main-menu__header__user {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
// stylelint-enable
</style>
