import { createEventHook } from '@vueuse/core';
import Color from 'color';
import { getCurrentInstance, onBeforeUnmount, onMounted } from 'vue';

export default {
  title: 'CSS/Colors',
};

function useCssResourceAddonSync({ window, document }) {
  const onChanged = createEventHook();

  let mutationObserver;

  onMounted(() => {
    if (window.MutationObserver) {
      mutationObserver = new window.MutationObserver((ev) => {
        onChanged.trigger(ev);
      });
      mutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['media'], // CSS resources addon switches properties using media attribute on styles
        childList: true,
        subtree: true,
      });
    }
  });

  onBeforeUnmount(() => {
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
  });

  return {
    onChanged: onChanged.on,
  };
}

export const all = () => ({
  setup() {
    const vueInstance = getCurrentInstance();
    const { onChanged } = useCssResourceAddonSync({ window, document });
    onChanged(() => {
      // we need to update Vue instance manually to trigger the render again and force getInfo() calls inside of the template to recalculate styles displayed in the texts
      vueInstance.update();
    });
    function getInfo(variable) {
      const hslValue = window.getComputedStyle(document.documentElement).getPropertyValue(variable);
      if (hslValue) {
        const color = new Color(`hsl(${hslValue})`);
        return `${color.hsl().string()}, ${color.hex()}, ${color.rgb()}`;
      }

      return null;
    }

    return {
      getInfo,
    };
  },
  template: `
    <div class="tw-m-auto tw-max-w-screen-lg tw-p-20">
      <h2>Key colors (themable)</h2>
      <table class="tw-mb-12 tw-w-full tw-border tw-border-solid tw-border-gray-6 tw-font-mono">
        <tbody>
          <tr v-for="i in 7">
            <td class="tw-w-1/6" :style="{ backgroundColor: 'hsl(var(--ec-key-color-level-' + i + '))' }"></td>
            <td class="tw-w-2/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ '--ec-key-color-level-' + i }}</span>
            </td>
            <td class="tw-w-3/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ getInfo('--ec-key-color-level-' + i) }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Gray colors (themable)</h2>
      <table class="tw-mb-12 tw-w-full tw-border tw-border-solid tw-border-gray-6 tw-font-mono">
        <tbody>
          <tr v-for="(i, index) in 9">
            <td class="tw-w-1/6" :style="{ backgroundColor: 'hsl(var(--ec-gray-color-level-' + index + '))' }"></td>
            <td class="tw-w-2/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ '--ec-gray-color-level-' + index }}</span>
            </td>
            <td class="tw-w-3/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ getInfo('--ec-gray-color-level-' + index) }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Complementary colors (themable and optional)</h2>
      <table class="tw-mb-12 tw-w-full tw-border tw-border-solid tw-border-gray-6 tw-font-mono">
        <tbody>
          <tr v-for="i in 2">
            <td class="tw-w-1/6" :style="{ backgroundColor: 'hsl(var(--ec-complementary-color-level-' + i + '))' }"></td>
            <td class="tw-w-2/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ '--ec-complementary-color-level-' + i }}</span>
            </td>
            <td class="tw-w-3/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ getInfo('--ec-complementary-color-level-' + i) }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Reserved colors (not themable)</h2>
      <table class="tw-mb-12 tw-w-full tw-border tw-border-solid tw-border-gray-6 tw-font-mono">
        <tbody>
          <tr v-for="color in ['error', 'error-dark', 'error-light', 'info', 'info-dark', 'info-light', 'success', 'success-dark', 'success-light', 'warning', 'warning-dark', 'warning-light']">
            <td class="tw-w-1/6" :style="{ backgroundColor: 'hsl(var(--ec-reserved-color-' + color + '))' }"></td>
            <td class="tw-w-2/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ '--ec-reserved-color-' + color }}</span>
            </td>
            <td class="tw-w-3/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ getInfo('--ec-reserved-color-' + color) }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Additional colors (not themable)</h2>
      <table class="tw-mb-12 tw-w-full tw-border tw-border-solid tw-border-gray-6 tw-font-mono">
        <tbody>
          <tr v-for="i in [18, 51, 64, 140, 166, 215, 266, 280, 297, 325]">
            <td class="tw-w-1/6" :style="{ backgroundColor: 'hsl(var(--ec-additional-color-level-' + i + '))' }"></td>
            <td class="tw-w-2/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ '--ec-additional-color-level-' + i }}</span>
            </td>
            <td class="tw-w-3/6 tw-p-4 tw-border-b tw-border-solid tw-border-gray-6">
              <span>{{ getInfo('--ec-additional-color-level-' + i) }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 class="colors__gradients">Gradients (themable)</h2>
      <div class="tw-bg-gradient-1 tw-w-1/2 tw-flex tw-items-center tw-justify-center tw-resize tw-overflow-auto" style="min-height: 150px;">
        <span class="tw-text-gray-8">Gradient 1</span>
      </div>
    </div>
  `,
});

all.parameters = {
  waitOn: '.colors__gradients',
  controls: { disable: true },
  actions: { disable: true },
};
