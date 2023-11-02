import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import type { CVueWrapper } from '../../../tests/utils/global';
import EcAlert from './ec-alert.vue';
import type { AlertProps } from './types';
import { AlertType } from './types';

describe('EcAlert', () => {
  function mountAlert(props?: Partial<AlertProps>, mountOpts?: ComponentMountingOptions<AlertProps>): CVueWrapper {
    return mount(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EcAlert as any,
      {
        props: {
          title: 'Title example',
          type: 'info',
          ...props,
        },
        ...mountOpts,
      },
    ) as CVueWrapper;
  }

  function mountAlertAsTemplate(
    template: string,
    wrapperComponentOpts?: Record<string, unknown>,
    mountOpts?: ComponentMountingOptions<AlertProps>,
  ) {
    const element = document.createElement('div');
    document.body.appendChild(element);

    const Component = defineComponent({
      components: { EcAlert },
      template,
      ...wrapperComponentOpts,
    });

    return mount(
      Component,
      {
        attachTo: element,
        ...mountOpts,
      },
    );
  }

  it('should render with custom attributes', () => {
    const wrapper = mountAlert({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display only with a title and the type given', () => {
    const wrapper = mountAlert({ title: 'Random Title', type: AlertType.INFO });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with a subtitle given', () => {
    const wrapper = mountAlert({ subtitle: 'Subtitle example' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with a button with the text given in the buttonText', () => {
    const wrapper = mountAlert({ buttonText: 'Button text' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given type for the alert type and for the button too', () => {
    const wrapper = mountAlert({ type: AlertType.ERROR, buttonText: 'Warning button' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each([AlertType.ERROR, AlertType.INFO, AlertType.SUCCESS, AlertType.WARNING])('should use the type "%s"', (alertType) => {
    const wrapper = mountAlert({ type: alertType });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the dismiss icon when is given the prop dismissable', () => {
    const wrapper = mountAlert({ dismissable: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should dismiss the alert when user clicks on the dismiss icon', async () => {
    const wrapper = mountAlertAsTemplate(
      '<ec-alert v-model:open="isOpen" type="info" title="Custom random" dismissable />',
      {
        data() {
          return { isOpen: true };
        },
      },
    ) as CVueWrapper;

    expect(wrapper.findByDataTest('ec-alert__dismiss-icon').exists()).toBe(true);
    await wrapper.findByDataTest('ec-alert__dismiss-icon').trigger('click');
    expect(wrapper.isVisible()).toBe(false);
  });

  it('should emit the event when user clicks on the button', async () => {
    const wrapper = mountAlert({ buttonText: 'Click here' });
    await wrapper.findByDataTest('ec-alert__button').trigger('click');
    expect(wrapper.emitted('action')?.length).toBe(1);
  });

  it('should emit the change event when user closes the alert', async () => {
    const wrapper = mountAlert({ open: true, dismissable: true });
    await wrapper.findByDataTest('ec-alert__dismiss-icon').trigger('click');
    expect(wrapper.emitted('change')?.length).toBe(1);
  });

  it('should dismiss or show the alert when we change the v-model', async () => {
    const wrapper = mountAlertAsTemplate(
      `<ec-alert v-model:open="isOpen" type="${AlertType.INFO}" title="Custom random" dismissable />`,
      {
        data() {
          return { isOpen: true };
        },
      },
    ) as CVueWrapper;

    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    await wrapper.findByDataTest('ec-alert__dismiss-icon').trigger('click');
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('should render with the default slot given', () => {
    const wrapper = mountAlert({
      subtitle: 'Subtitle example',
    }, {
      slots: {
        default: '<template #default="{ title, subtitle }"><div>Custom: {{ title }} - {{ subtitle }}</div></template>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with the cta slot given', () => {
    const wrapper = mountAlert({
      subtitle: 'Subtitle example',
    }, {
      slots: {
        cta: '<a href="#">Click me</a>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render responsive by default', () => {
    const wrapper = mountAlert();
    expect(wrapper.classes('ec-alert--is-responsive')).toBe(true);
  });

  it('should not render responsive if the responsive prop is set to false', () => {
    const wrapper = mountAlert({ responsive: false });
    expect(wrapper.classes('ec-alert--is-responsive')).toBe(false);
  });
});
