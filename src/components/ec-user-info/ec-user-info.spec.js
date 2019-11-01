/* eslint-disable no-use-before-define */
import { mount } from '@vue/test-utils';
import EcUserInfo from '@/components/ec-user-info/ec-user-info.vue';
// import { withMockedConsole2 } from '../../../tests/utils/console';

const user = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar: 'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
};

describe('EcUserInfo', () => {
  it('renders correctly', () => {
    const wrapper = mount(EcUserInfo, {
      propsData: {
        user,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('will emit a toggle event', () => {
    const wrapper = mount(EcUserInfo, {
      propsData: {
        user,
      },
    });
    wrapper.vm.toggle();
    expect(wrapper.emitted().toggle).toBe(true);
  });


  // it('should throw an error if prop object was not given', () => {
  //   withMockedConsole2((errorSpy) => {
  //     mount(EcUserInfo);
  //     expect(errorSpy).toHaveBeenCalled();
  //     expect(errorSpy.mock.calls[0][0]).toContain('TypeError');
  //   });
  // });
});
