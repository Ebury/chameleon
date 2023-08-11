import { mount } from '@vue/test-utils';
import clipboardCopy from 'clipboard-copy';

import { withMockedConsole } from '../../../tests/utils/console';
import EcInlineInputField from './ec-inline-input-field.vue';

jest.mock('clipboard-copy');

describe('EcInlineInputField', () => {
  const inputFieldValue = 'Input field value';
  const tooltipTextSuccess = 'Copied!';
  const tooltipTextError = 'Unable to copy';

  function mountInlineInputField(props, mountOpts) {
    return mount(EcInlineInputField, {
      props: {
        label: 'Label',
        isEditable: true,
        value: inputFieldValue,
        tooltipTextSuccess,
        tooltipTextError,
        ...props,
      },
      ...mountOpts,
    });
  }

  describe(':attributes', () => {
    it('should correctly display attributes passed', () => {
      const wrapper = mountInlineInputField({
        isSensitive: true,
        id: 'My-id',
        'data-test': 'My-data-test',
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when component is non-editable', () => {
    it('should render as expected', () => {
      const wrapper = mountInlineInputField({
        isEditable: false,
      }, {
        slots: {
          default: '<a href="#">Link</a>',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a sensitive class when isSensitive prop is set to true', () => {
      const wrapper = mountInlineInputField({
        isEditable: false,
        isSensitive: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when component is editable', () => {
    describe('when the component is in its initial state', () => {
      it('should render as expected', () => {
        const wrapper = mountInlineInputField();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-value-text').exists()).toBe(true);
      });

      it('should render with a sensitive class when isSensitive prop is set to true when isSensitive prop is set to true', () => {
        const wrapper = mountInlineInputField({
          isSensitive: true,
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-value-text').exists()).toBe(true);
      });

      it('should render with a label tooltip when labelTooltip prop is set', () => {
        const wrapper = mountInlineInputField({ labelTooltip: 'Testing the labelTooltip prop' });
        expect(wrapper.element).toMatchSnapshot();
      });

      describe('@events', () => {
        it('should emit `edit` event when the edit button is clicked', async () => {
          const wrapper = mountInlineInputField();

          expect(wrapper.emitted('edit')).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-value-text__action').trigger('click');

          expect(wrapper.emitted('edit').length).toBe(1);
        });
      });
    });

    describe('when the component is in editing mode', () => {
      it('should render as expected', () => {
        const wrapper = mountInlineInputField({
          isEditing: true,
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-edit').exists()).toBe(true);
      });

      it('should gain focus the input field', async () => {
        const wrapper = mountInlineInputField({
          isEditing: true,
        });
        const focusSpy = jest.spyOn(wrapper.findByDataTest('ec-inline-input-field-edit__input').element, 'focus');
        await wrapper.vm.$nextTick();

        expect(focusSpy).toHaveBeenCalledTimes(1);
        focusSpy.mockRestore();
      });

      it('should render with a sensitive class when isSensitive prop is set to true', () => {
        const wrapper = mountInlineInputField(
          {
            isEditing: true,
            isSensitive: true,
          },
        );

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-edit').exists()).toBe(true);
      });

      it('should render properly when the errorMessage prop is given', () => {
        const wrapper = mountInlineInputField({
          isEditing: true,
          errorMessage: 'error msg',
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-input-field__error-text').exists()).toBe(true);
      });

      describe('@events', () => {
        it('should emit `cancel` event when esc key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted('cancel')).toBeUndefined();
          expect(wrapper.emitted('cancel')).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.esc');

          expect(editComponentWrapper.emitted('cancel')[0]).toEqual([]);
          expect(wrapper.emitted('cancel')[0]).toEqual([]);
        });

        it('should emit `cancel` event when the cancel button is clicked', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted('cancel')).toBeUndefined();
          expect(wrapper.emitted('cancel')).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__cancel-action').trigger('click');

          expect(editComponentWrapper.emitted('cancel')[0]).toEqual([]);
          expect(wrapper.emitted('cancel')[0]).toEqual([]);
        });

        it('should emit `submit` event when enter key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted('submit')).toBeUndefined();
          expect(wrapper.emitted('submit')).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.enter');

          expect(editComponentWrapper.emitted('submit')[0]).toEqual([{ value: inputFieldValue }]);
          expect(wrapper.emitted('submit')[0]).toEqual([inputFieldValue]);
        });

        it('should emit `submit` event when the submit button is clicked', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted('submit')).toBeUndefined();
          expect(wrapper.emitted('submit')).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__submit-action').trigger('click');

          expect(editComponentWrapper.emitted('submit')[0]).toEqual([{ value: inputFieldValue }]);
          expect(wrapper.emitted('submit')[0]).toEqual([inputFieldValue]);
        });
      });
    });

    describe('when the component is loading', () => {
      it('should render as expected', () => {
        const wrapper = mountInlineInputField({
          isLoading: true,
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-loading').exists()).toBe(true);
      });

      it('should render with a sensitive class when isSensitive prop is set to true', () => {
        const wrapper = mountInlineInputField({ isLoading: true, isSensitive: true });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-loading').exists()).toBe(true);
      });
    });
  });

  describe('when component is copiable', () => {
    it('should throw an error if the tooltip props were not given', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mount(EcInlineInputField, {
          props: {
            label: 'Label',
            isEditable: true,
            value: inputFieldValue,
          },
        });

        expect(warnSpy).toHaveBeenCalledTimes(2);
        expect(warnSpy.mock.calls[0][0]).toContain('[Vue warn]: Missing required prop: "tooltipTextSuccess"');
        expect(warnSpy.mock.calls[1][0]).toContain('[Vue warn]: Missing required prop: "tooltipTextError"');
      });
    });

    it('should render with a label tooltip when labelTooltip prop is set', () => {
      const wrapper = mountInlineInputField({ labelTooltip: 'Testing the labelTooltip prop' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as expected', () => {
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-inline-input-field-copy').exists()).toBe(true);
    });

    it('should render with a sensitive class when isSensitive prop is set to true', () => {
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          isSensitive: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-inline-input-field-copy').exists()).toBe(true);
    });

    it('should show the success tooltip after successfully triggering the copy method', async () => {
      mockClipboardCopySuccess();
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('click');

      expect(clipboardCopy).toHaveBeenCalledTimes(1);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-content')).toBe(tooltipTextSuccess);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-popper-class')).toBe('ec-tooltip--bg-success');
    });

    it('should show the error tooltip after unsuccessfully triggering the copy method', async () => {
      mockClipboardCopyError();
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('click');

      expect(clipboardCopy).toHaveBeenCalledTimes(1);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-content')).toBe(tooltipTextError);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-popper-class')).toBe('ec-tooltip--bg-error');
    });

    it('should hide the tooltip after we move the cursor away from the copy button', async () => {
      mockClipboardCopySuccess();
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('click');
      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('mouseleave');
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-popover-shown')).toBeUndefined();
    });
  });
});

function mockClipboardCopySuccess() {
  clipboardCopy.mockResolvedValue();
}

function mockClipboardCopyError() {
  clipboardCopy.mockRejectedValue();
}
