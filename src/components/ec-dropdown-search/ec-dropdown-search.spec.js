import { mount } from '@vue/test-utils';
import MutationObserver from 'mutation-observer';
import EcDropdownSearch from '@/components/ec-dropdown-search/ec-dropdown-search.vue';

global.MutationObserver = MutationObserver;

describe('EcDropdownSearch', () => {
  it('Should render as expected', () => {
    const wrapper = mount(EcDropdownSearch, {
      propsData: {
        items: [
          {
            disabled: false,
            active: true,
            disabledReason:
              'This account is not active at the moment. Please e-mail us at solutions@ebury.com or contact your relationship manager at +44 (0) 207 197 2421.',
            id: 'EBPCLI00007',
            text: 'Ebury Demo 2',
          },
          {
            disabled: false,
            active: false,
            disabledReason:
              'This account is not active at the moment. Please e-mail us at solutions@ebury.com or contact your relationship manager at +44 (0) 207 197 2421.',
            id: 'EBPCLI00004',
            text: 'Ebury Demo',
          },
        ],
        user: {
          clientName: 'Ebury Demo 2',
          email: 'ebury.demo2@ebury.com',
          gravatar:
            'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
        },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
