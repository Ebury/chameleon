
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import EcMetrolineItem from './components/ec-metroline-item';
import EcMetroline from './ec-metroline.vue';

async function mountMetrolineAsTemplate(template: string, wrapperComponentOpts = {}) {
  const Component = defineComponent({
    components: { EcMetroline, EcMetrolineItem },
    template,
    ...wrapperComponentOpts,
  });

  const wrapper = mount(Component);
  await wrapper.vm.$nextTick();
  return wrapper;
}

const metrolineWithItemsTemplate = `
<ec-metroline>
  <ec-metroline-item
    :id="1"
  >
    <template #heading>
      <span>Item 1 Heading</span>
    </template>

    <template #sub-heading="{ isCompleted }">
      <span v-if="isCompleted">Item 1 Sub-heading</span>
    </template>

    <template #header-cta="{ activateItem, isCompleted, isReadOnly }">
      <button
        v-if="isCompleted && !isReadOnly"
        @click="activateItem"
        data-test="header-cta-edit"
      >
        Edit
      </button>

      <button
        v-else-if="isCompleted"
        data-test="header-cta-completed">Download
      </button>
    </template>

    <template #main>
      <p>Item 1 Main Content</p>
    </template>

    <template #footer-cta="{ goToNext, complete }">
      <button
        @click="goToNext"
        data-test="footer-cta-button"
      >
        Continue
      </button>

      <button
        @click="complete"
        data-test="footer-cta-complete-metroline"
      >
        Complete Metroline
    </button>
    </template>
  </ec-metroline-item>

  <ec-metroline-item
    :id="2"
  >
    <template #heading>
      <span>Item 2 Heading</span>
    </template>

    <template #sub-heading="{ isCompleted }">
      <span v-if="isCompleted">Item 2 Sub-heading</span>
    </template>

    <template #header-cta="{ activateItem }">
      <button
        @click="activateItem"
        data-test="header-cta-edit"
      >
        Edit
      </button>
    </template>

    <template #main>
      <p>Item 2 Main Content</p>
    </template>

    <template #footer-cta="{ goToNext }">
      <button
        @click="goToNext"
        data-test="footer-cta-button"
      >
          Continue
      </button>
    </template>
  </ec-metroline-item>
</ec-metroline>
`;

describe('EcMetroline', () => {
  it('should render a metroline with items', async () => {
    const wrapper = await mountMetrolineAsTemplate(metrolineWithItemsTemplate);

    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render the metroline badgeText', async () => {
      const wrapper = await mountMetrolineAsTemplate(
        `<ec-metroline>
          <ec-metroline-item :id="1" badgeText="IV">
            <template #heading>
              <span>Item 1 Heading</span>
            </template>

            <template #main>
              <p>Item 1 Main Content</p>
            </template>
          </ec-metroline-item>
        </ec-metroline>`,
      );

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should throw an error if we don\'t pass an id', () => {
      withMockedConsole((_errorSpy, warnSpy) => {
        mountMetrolineAsTemplate(
          `<ec-metroline>
            <ec-metroline-item>
              <template #heading>
                <span>Item 1 Heading</span>
              </template>
            </ec-metroline-item>
          </ec-metroline>`,
        );

        expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "id"');
        expect(warnSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('should throw an error if we don\'t provide Metroline context', () => {
      expect.assertions(3);

      withMockedConsole((_errorSpy, warnSpy) => {
        try {
          mount(EcMetrolineItem, { props: { id: 1 } });
        } catch (e) {
          expect((e as Error).message).toBe('Metroline context is not provided');
        }

        expect(warnSpy.mock.calls[0][0]).toContain('injection "Symbol(metroline)" not found.');
        expect(warnSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('@events', () => {
    it('should emit a "change" event when we go to next item', async () => {
      const onChange = vi.fn();
      const wrapper = await mountMetrolineAsTemplate(`
      <ec-metroline @change="onChange">
        <ec-metroline-item
          v-for="index in 2"
          :key="index"
          :id="index">
          <template #heading>
            <span>Heading</span>
          </template>

          <template #footer-cta="{ goToNext }">
            <button
              data-test="footer-cta-button"
              @click="goToNext"
            >
              Continue
            </button>
          </template>
        </ec-metroline-item>
      </ec-metroline>`, {
        methods: {
          onChange,
        },
      });

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should emit a "change" event when we activate a previous item', async () => {
      const onChange = vi.fn();
      const wrapper = await mountMetrolineAsTemplate(`
      <ec-metroline @change="onChange">
        <ec-metroline-item
          v-for="index in 2"
          :key="index"
          :id="index">
          <template #heading>
            <span>Heading</span>
          </template>

          <template #header-cta="{ activateItem }">
            <button
              @click="activateItem"
              data-test="header-cta-edit"
            >
              Edit
            </button>
          </template>

          <template #footer-cta="{ goToNext }">
            <button
              data-test="footer-cta-button"
              @click="goToNext"
            >
              Continue
            </button>
          </template>
        </ec-metroline-item>
      </ec-metroline>`, {
        methods: {
          onChange,
        },
      });

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('header-cta-edit')
        .trigger('click');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should emit a "complete" event when  the metroline is complete', async () => {
      const onComplete = vi.fn();
      const wrapper = await mountMetrolineAsTemplate(`
      <ec-metroline @complete="onComplete">
        <ec-metroline-item :id="1">
          <template #heading>
            <span>Heading</span>
          </template>

          <template #main>
            <p>Main Content</p>
          </template>

          <template #footer-cta="{ goToNext }">
            <button
              data-test="footer-cta-button"
              @click="goToNext"
            >
              Continue
            </button>
          </template>
        </ec-metroline-item>
      </ec-metroline>`, {
        methods: {
          onComplete,
        },
      });

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(onComplete).toHaveBeenCalledTimes(1);
    });
  });

  describe('order', () => {
    it('should have the correct next item order if we show, hide and show again a metro item', async () => {
      const wrapper = await mountMetrolineAsTemplate(
        `<ec-metroline>
          <ec-metroline-item :id="1" >
            <template #heading>
              <span>First</span>
            </template>

            <template #footer-cta="{ goToNext }">
              <button
                data-test="footer-cta-button"
                @click="goToNext"
              >
                Continue
              </button>
            </template>
          </ec-metroline-item>

          <ec-metroline-item v-if="isVisible" :id="2" >
            <template #heading>
              <span>Second</span>
            </template>

            <template #footer-cta="{ goToNext }">
              <button
                data-test="footer-cta-button"
                @click="goToNext"
                >
                  Continue
                </button>
            </template>
          </ec-metroline-item>

          <ec-metroline-item :id="3" >
            <template #heading>
              <span>Third</span>
            </template>

            <template #footer-cta="{ goToNext }">
              <button
                data-test="footer-cta-button"
                @click="goToNext"
              >
                Continue
              </button>
            </template>
          </ec-metroline-item>
        </ec-metroline>`,
        {
          data() {
            return { isVisible: true };
          },
        },
      );
      await wrapper.setData({ isVisible: false });
      await wrapper.setData({ isVisible: true });

      // Item 1: active, Item 2: not active, Item 3: not active
      expect(wrapper.element).toMatchSnapshot();

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(wrapper.element).toMatchSnapshot();

      await wrapper
        .findByDataTest('ec-metroline-item--2')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('permissions', () => {
    it('should not go to next if we click continue on a completed item', async () => {
      const wrapper = await mountMetrolineAsTemplate(metrolineWithItemsTemplate);

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(wrapper.element).toMatchSnapshot();

      // Click continue on the first item again. Nothing should happen this time.
      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should be able to go back to a previous item if metroline is not complete', async () => {
      const wrapper = await mountMetrolineAsTemplate(metrolineWithItemsTemplate);
      expect(wrapper.element).toMatchSnapshot();

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(wrapper.element).toMatchSnapshot();

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('header-cta-edit')
        .trigger('click');

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not be able to go back to a previous item if metroline is complete and should show the header-cta-completed instead', async () => {
      const wrapper = await mountMetrolineAsTemplate(metrolineWithItemsTemplate);

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(wrapper.findByDataTest('ec-metroline-item--1').findByDataTest('header-cta-edit').exists()).toBe(true);

      await wrapper
        .findByDataTest('ec-metroline-item--2')
        .findByDataTest('footer-cta-button')
        .trigger('click');

      expect(wrapper.findByDataTest('ec-metroline-item--1').findByDataTest('header-cta-edit').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-metroline-item--1').findByDataTest('header-cta-completed').exists()).toBe(true);

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should complete the metroline if we click on complete metroline', async () => {
      const wrapper = await mountMetrolineAsTemplate(metrolineWithItemsTemplate);

      expect(wrapper.findByDataTest('ec-metroline-item--1').findByDataTest('header-cta-completed').exists()).toBe(false);

      await wrapper
        .findByDataTest('ec-metroline-item--1')
        .findByDataTest('footer-cta-complete-metroline')
        .trigger('click');

      expect(wrapper.findByDataTest('ec-metroline-item--1').findByDataTest('header-cta-completed').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
