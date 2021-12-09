import Color from 'color';

export default {
  title: 'CSS/Colors',
};

export const all = () => ({
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
    </div>
  `,
  methods: {
    getInfo(variable) {
      const hslValue = window.getComputedStyle(document.documentElement).getPropertyValue(variable);
      if (hslValue) {
        const color = new Color(`hsl(${hslValue})`);
        return `${color.hsl().string()}, ${color.hex()}, ${color.rgb()}`;
      }

      return null;
    },
  },
  mounted() {
    if (global.MutationObserver) {
      this.mutationObserver = new global.MutationObserver(() => {
        this.$forceUpdate();
      });
      this.mutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['media'], // CSS resources addon switches properties using media attribute on styles
        childList: true,
        subtree: true,
      });
    }
  },
  beforeDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  },
});

all.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
