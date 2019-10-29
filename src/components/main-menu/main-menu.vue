<template>
  <!-- Nav wrapper -->
  <nav
    class="main-menu ec-bg-color-main2"
    :class="{'main-menu--expanded ec-box-shadow2': expanded}"
  >
    <ul>
      <!-- Menu Header -->
      <li>
        <div class="main-menu__header">
          <span class="main-menu__header__logo">
            <img :src="brandLogo">
          </span>
          <img
            class="main-menu__header__avatar"
            :src="user.gravatar"
            alt="Avatar"
            @click="toggleMenu"
          >
          <div class="main-menu__header__user-account">
            <span class="main-menu__header__user ec-menu-item">
              <a
                class="ec-h4 ec-menu-item-text"
                href="/profile"
              >{{ user.clientName }}</a>
            </span>
            <div
              v-if="accounts.length > 1"
              class="ec-dropdown main-menu__header__account-selector main-menu__header__account"
            >
              <!-- Here is the selector account, can be a ec-dropdown-search -->
              <slot name="selector-account" />
            </div>
            <span
              v-else
              class="ec-menu-item main-menu__header__account"
            >
              <a
                class="ec-menu-item-text"
                href="/account/info"
              >{{ user.clientName }}</a>
            </span>
          </div>
        </div>
      </li>
      <!-- Button for create a new Trade -->
      <li
        v-if="hasPermissionToTrade"
        class="main-menu__button"
      >
        <template v-if="isTradingEnabled">
          <a
            href="/trade/"
            class="ec-btn ec-btn-negative-primary"
          >New trade</a>
          <a
            href="/trade/"
            class="ec-btn ec-btn-negative-primary ec-btn-sm ec-btn-ico"
          >
            <i class="ec-ico ec-ico-plus" />
          </a>
          <a
            href="/trade/"
            class="ec-btn ec-btn-negative-primary ec-btn-sm"
          >New trade</a>
        </template>
        <template v-else>
          <span class="main-menu__button__tooltip">
            <button
              type="button"
              class="ec-btn ec-btn-negative-primary"
              disabled
            >New trade</button>
            <button
              type="button"
              class="ec-btn ec-btn-negative-primary ec-btn-sm ec-btn-ico"
              disabled
            >
              <i class="ec-ico ec-ico-plus" />
            </button>
            <button
              type="button"
              class="ec-btn ec-btn-negative-primary ec-btn-sm"
              disabled
            >New trade</button>
          </span>
        </template>
      </li>

      <!-- Main Menu Items -->
      <ec-navigation-item
        v-for="(link, index) in links"
        :key="index"
        v-bind="link"
      />
    </ul>

    <!-- Menu Footer -->
    <div class="main-menu__footer">
      <div class="main-menu__footer__links">
        <a
          v-if="showHelp"
          href
          class="ec-h6 ec-menu-item js-help-button"
          @click.prevent
        >
          <span class="ec-ico ec-ico-live-help" />
          <span class="text ec-menu-item-text">Help</span>
        </a>
        <a
          href="/logout/"
          class="ec-h6 ec-menu-item"
          @click="logout"
        >
          <span class="ec-ico ec-ico-power-settings-new" />
          <span class="text ec-menu-item-text">Logout</span>
        </a>
      </div>
      <div
        v-if="isEbury"
        class="main-menu__footer__copyright ec-text-caption"
      >Ebury Partners UK Ltd {{ getFullYear }}</div>
    </div>

    <!-- Move to tooltip when we have the component -->
    <span hidden>
      <template
        v-if="isTradingDisabled"
      >Online trading is disabled at this time, please contact your relationship manager</template>
      <template v-else-if="isTradingBusinessClosed">Not a business hour</template>
    </span>
  </nav>
</template>

<script>
import EcNavigationItem from '../ec-navigation-link';

export default {
  components: {
    EcNavigationItem,
  },
  props: {
    accounts: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
    brandLogo: {
      type: String,
      required: true,
    },
    tradingStatus: {
      type: String,
      required: true,
    },
    hasPermissionToTrade: {
      type: Boolean,
      required: true,
    },
    showHelp: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    getFullYear() {
      return new Date().getFullYear();
    },
    isTradingEnabled() {
      return this.tradingStatus === 'enabled';
    },
    isTradingBusinessClosed() {
      return this.tradingStatus === 'businessClosed';
    },
    isTradingDisabled() {
      return this.tradingStatus === 'disabled';
    },
    isEbury() {
      return true;
    },
  },
  methods: {
    toggleMenu() {
      this.expanded = !this.expanded;
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style lang="scss">
// stylelint-disable selector-max-id, selector-max-class, selector-class-pattern

.main-menu a:hover,
.main-menu a:focus {
  text-decoration: none;
}

#content {
  padding: 1.5rem;
  background-color: white;
  display: table-cell;
  position: relative;
}

.container {
  min-height: 100vh;
  width: 1260px;
  padding: 0;
  display: flex;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);

  .main-menu-container {
    flex: 0 0 17.5rem;
    height: 100vh;
    display: flex;

    > div {
      flex-grow: 1;
    }
  }

  #content {
    max-width: calc(1260px - 17.5rem);
    flex-grow: 1;
  }
}

.ec .main-menu {
  width: 17.5rem;
  height: 100vh;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-blend-mode: color;
  z-index: 1;

  ul {
    padding: 0;
    list-style: none;
    flex-grow: 1;
  }

  .main-menu__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    .main-menu__header__logo {
      margin-bottom: 1.5rem;

      img {
        height: 2.5rem;
      }
    }

    .main-menu__header__avatar {
      width: 3rem;
      height: 3rem;
      margin-bottom: 0.5rem;
      border-radius: 0.35rem;
      pointer-events: none;
    }

    .main-menu__header__user-account {
      display: flex;
      flex-direction: column;
      align-items: center;
      white-space: nowrap;
      transition: 0.5s;
      width: 100%;
      text-align: center;
    }

    .main-menu__header__user {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .main-menu__header__account-selector {
      width: 100%;

      a {
        display: block;
        pointer-events: none;

        .title {
          pointer-events: auto;
          max-width: 13.75rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
        }
      }

      a:after {
        pointer-events: auto;
        vertical-align: top;
      }
    }
  }

  .main-menu__button {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;

    .main-menu__button__tooltip {
      max-width: 100%;
    }

    .ec-btn {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ec-btn-sm {
      display: none;
    }
  }

  .main-menu__footer {
    .main-menu__footer__links {
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;

      > a {
        height: 1.5rem;
        margin: 0 0.5rem;
        display: flex;
        align-items: center;
        text-transform: capitalize;
        transition: 0.5s;
        max-width: 50%;
        overflow: hidden;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }
      }

      .text {
        transition: color 0.25s;
        white-space: nowrap;
        flex: 1 1 0;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .ec-ico {
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 0.5rem;
      }
    }

    .main-menu__footer__copyright {
      white-space: nowrap;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .ec-dropdown-menu {
    max-width: 100%;
  }
}

@media only screen and (max-width: 1279px) {
  .container {
    width: 100%;
    min-width: 760px;
  }

  .main-menu-container {
    flex-basis: 5rem;
  }

  #content {
    max-width: none;
  }

  .ec .main-menu {
    width: 5rem;
    transition: width 0.5s;
    z-index: 1060; // For being over tooltips that appears in the content

    .main-menu__header {
      margin: -0.5rem -0.5rem 2.5rem;
      padding-bottom: 0;
      flex-direction: row;

      .main-menu__header__logo {
        display: none;
      }

      .main-menu__header__avatar {
        margin-bottom: 0;
        pointer-events: auto;
        cursor: pointer;
      }

      .main-menu__header__user-account {
        opacity: 0;
        margin-left: 1rem;
        align-items: flex-start;
        text-align: left;
        min-width: 0;
      }
    }

    .main-menu__button {
      .ec-btn:not(.ec-btn-ico) {
        display: none;
      }

      .ec-btn-ico {
        display: inline-block;
      }
    }

    .main-menu__footer {
      .main-menu__footer__links {
        flex-direction: column-reverse;
        margin-bottom: 0.5rem;
        align-items: center;

        > a {
          margin: 1.5rem 0 0;
          width: 1.5rem;
          max-width: none;
        }

        .text {
          display: none;
        }

        .ec-ico {
          margin: 0;
        }
      }

      .main-menu__footer__copyright {
        display: none;
      }
    }

    &.main-menu--expanded {
      width: 16rem;

      .main-menu__header {
        .main-menu__header__user-account {
          opacity: 1;
        }
      }

      .main-menu__button {
        .ec-btn-sm:not(.ec-btn-ico) {
          display: block;
        }

        .ec-btn-ico {
          display: none;
        }
      }

      .main-menu__footer {
        .main-menu__footer__links {
          flex-direction: row;
          margin-bottom: 1rem;

          > a {
            margin: 0 0.5rem;
            width: auto;

            &:first-child {
              margin-left: 0;
            }

            &:last-child {
              margin-right: 0;
            }
          }

          .text {
            display: block;
          }

          .ec-ico {
            margin-right: 0.5rem;
          }
        }

        .main-menu__footer__copyright {
          display: block;
        }
      }
    }
  }
}
// stylelint-enable
</style>
