import { mount } from '@vue/test-utils';
import { EDITING, LOADING, READ_ONLY } from './enums/status';
import EcInlineInputField from './ec-inline-input-field.vue';

describe('EcInlineInputField', () => {
  const inputFieldValue = 'Input field value';

  function mountInlineInputField(props, mountOpts) {
    return mount(EcInlineInputField, {
      propsData: {
        label: 'Label',
        isEditable: true,
        value: inputFieldValue,
        ...props,
      },
      ...mountOpts,
    });
  }

  describe('when component is non-editable', () => {
    it('should render as expected', async () => {
      const wrapper = mountInlineInputField({ isEditable: false }, {
        slots: {
          default: '<a href="#">Link</a>',
        },
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when component is editable', () => {
    describe(`when the component's status is ${READ_ONLY} (initial status)`, () => {
      it('should render as expected', async () => {
        const wrapper = mountInlineInputField();
        await wrapper.vm.$nextTick();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-value-text').exists()).toBeTruthy();
      });

      it('should gain focus the edit button', async () => {
        const wrapper = mountInlineInputField({}, {
          data() {
            return {
              gainFocus: true,
            };
          },
        });
        const focusSpy = jest.spyOn(wrapper.findByDataTest('ec-inline-input-field-value-text__action').element, 'focus');
        await wrapper.vm.$nextTick();

        expect(focusSpy).toHaveBeenCalledTimes(1);
        focusSpy.mockRestore();
      });

      describe('@events', () => {
        it('should emit `edit` event when the edit button is clicked', async () => {
          const wrapper = mountInlineInputField();
          await wrapper.vm.$nextTick();

          expect(wrapper.emitted('edit')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-value-text__action').trigger('click');
          await wrapper.vm.$nextTick();

          expect(wrapper.emitted('edit').length).toBeTruthy();
        });
      });
    });

    describe(`when the component's status is ${EDITING}`, () => {
      it('should render as expected', async () => {
        const wrapper = mountInlineInputField({ status: EDITING });
        await wrapper.vm.$nextTick();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-edit').exists()).toBeTruthy();
      });

      it('should gain focus the input field', async () => {
        const wrapper = mountInlineInputField({ status: EDITING });
        const focusSpy = jest.spyOn(wrapper.findByDataTest('ec-inline-input-field-edit__input').element, 'focus');
        await wrapper.vm.$nextTick();

        expect(focusSpy).toHaveBeenCalledTimes(1);
        focusSpy.mockRestore();
      });

      describe('@events', () => {
        it('should emit `cancel` event when esc key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({ status: EDITING });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')).toBeUndefined();
          expect(wrapper.emitted('cancel')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.esc');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')[0]).toEqual([{ isKeyboardEvent: true }]);
          expect(wrapper.emitted('cancel')[0]).toEqual([]);
        });

        it.each([
          ['click', 'click', {}],
          ['enter key', 'keydown.enter', { isKeyboardEvent: true }],
          ['space key', 'keydown.space', { isKeyboardEvent: true }],
        ])('should emit `cancel` event when the cancel button is pressed (via %s)', async (method, event, emittedInfo) => {
          const wrapper = mountInlineInputField({ status: EDITING });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')).toBeUndefined();
          expect(wrapper.emitted('cancel')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__cancel-action').trigger(event);
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')[0]).toEqual([emittedInfo]);
          expect(wrapper.emitted('cancel')[0]).toEqual([]);
        });

        it('should emit `submit` event when enter key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({ status: EDITING });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('sumbit')).toBeUndefined();
          expect(wrapper.emitted('sumbit')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.enter');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('submit')[0]).toEqual([{ value: inputFieldValue, isKeyboardEvent: true }]);
          expect(wrapper.emitted('submit')[0]).toEqual([inputFieldValue]);
        });

        it.each([
          ['click', 'click', { value: inputFieldValue }],
          ['enter key', 'keydown.enter', { value: inputFieldValue, isKeyboardEvent: true }],
          ['space key', 'keydown.space', { value: inputFieldValue, isKeyboardEvent: true }],
        ])('should emit `submit` event when the submit button is pressed (via %s)', async (method, event, emittedInfo) => {
          const wrapper = mountInlineInputField({ status: EDITING });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('submit')).toBeUndefined();
          expect(wrapper.emitted('submit')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__submit-action').trigger(event);
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('submit')[0]).toEqual([emittedInfo]);
          expect(wrapper.emitted('submit')[0]).toEqual([inputFieldValue]);
        });
      });
    });

    describe(`when the component's status is ${LOADING}`, () => {
      it('should render as expected', async () => {
        const wrapper = mountInlineInputField({ status: LOADING });
        await wrapper.vm.$nextTick();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-loading').exists()).toBeTruthy();
      });
    });
  });
});
