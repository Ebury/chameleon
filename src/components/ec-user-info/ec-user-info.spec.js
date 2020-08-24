import { mount } from '@vue/test-utils';
import EcUserInfo from './ec-user-info.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const user = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar: 'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
};

describe('EcUserInfo', () => {
  it('should render as expected', () => {
    const wrapper = mount(EcUserInfo, {
      propsData: {
        user,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slot for client selector', () => {
    const wrapper = mount(EcUserInfo, {
      propsData: {
        user,
      },
      slots: {
        'client-selector': `
          <select>
            <option value="ebury">Ebury</option>
            <option value="eburydemo2">EburyDemo2</option>
          </select>`,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit a toggle event', () => {
    const wrapper = mount(EcUserInfo, {
      propsData: {
        user,
      },
    });
    wrapper.findByDataTest('ec-user-info__avatar').trigger('click');
    expect(wrapper.emitted().toggle).toBeTruthy();
  });

  it('should throw an error if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcUserInfo);
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "user"');
    });
  });

  it('should not show text when collapsed', () => {
    const wrapper = mount(EcUserInfo, {
      propsData: {
        user,
        isCollapsed: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.contains('.ec-user-info__client-name')).toBe(false);
  });

  it('should show text when not collapsed', () => {
    const wrapper = mount(EcUserInfo, {
      propsData: {
        user,
        isCollapsed: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.contains('.ec-user-info__client-name')).toBe(true);
  });
});
