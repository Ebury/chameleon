import { mount } from '@vue/test-utils';

import EcUserInfo from './ec-user-info.vue';
import type { UserInfo } from './types';

const user: UserInfo = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar: 'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
};

describe('EcUserInfo', () => {
  it('should render as expected', () => {
    const wrapper = mount(EcUserInfo, {
      props: {
        user,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slot for client selector', () => {
    const wrapper = mount(EcUserInfo, {
      props: {
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

  it('should emit a toggle event', async () => {
    const wrapper = mount(EcUserInfo, {
      props: {
        user,
      },
    });
    await wrapper.findByDataTest('ec-user-info__avatar').trigger('click');
    expect(wrapper.emitted('toggle')?.length).toBe(1);
  });

  it('should not show text when collapsed', () => {
    const wrapper = mount(EcUserInfo, {
      props: {
        user,
        isCollapsed: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show text when not collapsed', () => {
    const wrapper = mount(EcUserInfo, {
      props: {
        user,
        isCollapsed: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
