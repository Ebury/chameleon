/// <reference types="cypress-image-snapshot" />
import { EcInputField } from '../../main';
import type { InputFieldProps } from './types';
import { InputFieldType } from './types';

import 'tailwindcss/dist/tailwind.min.css';
import '../../styles/main.css';
import '../../styles/themes/blue.css';
import type { MountingOptions } from '@vue/test-utils';

import config from '../../config'

function mountInputField (
  props?: Partial<InputFieldProps> & { onClick?: unknown, 'onUpdate:modelValue'?: unknown },
  mountOpts?: MountingOptions<InputFieldProps>) {
  return cy.mount<InputFieldProps>(
    EcInputField,
    {
      props: {
        modelValue: 'Text test',
        type: InputFieldType.TEXT,
        errorMessage: '',
        label: 'label test',
        note: 'note test',
        labelTooltip: 'Some tooltip',
        ...props,
      },
      ...mountOpts,
    },
  );
}

describe('InputField', () => {
  it('should display properly with the given props', () => {
    mountInputField({ modelValue: 'Some text' });
    cy.get('body')
      .should('have.css', 'font-family')
      .and('match', /Roboto/);
    cy.wait(200);
    cy.get('[data-test*=ec-input-field__input]').invoke('attr', 'autocomplete').should('eq', undefined);
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('should display tooltip', () => {
    mountInputField();
    cy.get('[data-test=ec-input-field__tooltip]').trigger('mouseenter');
    cy.get('.v-popper__wrapper')
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly with the given prop autocomplete OFF', () => {
    mountInputField({ autocomplete: 'off' });
    cy.get('[data-test*=ec-input-field__input]').invoke('attr', 'autocomplete').should('eq', 'off');
  });

  it('renders properly with the given prop autocomplete ON', () => {
    mountInputField({ autocomplete: 'on' });
    cy.get('[data-test*=ec-input-field__input]').invoke('attr', 'autocomplete').should('eq', 'on');
  });

  it('renders properly with the given prop errorMessage', () => {
    mountInputField({ errorMessage: 'error msg' });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly without the error when the prop errorMessage is given and the isInGroup prop is not empty', () => {
    mountInputField({ errorMessage: 'error msg', isInGroup: 'right' });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly with the id from the parent', () => {
    mountInputField({ id: 'id-test' });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly with the errorId from the parent', () => {
    mountInputField({
      errorId: 'error-id-test',
      errorMessage: 'Test error message',
    });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly without label', () => {
    mountInputField({ label: '' });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly without note', () => {
    mountInputField({ note: '' });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders with the attrs min and max', () => {
    mountInputField({ type: InputFieldType.NUMBER }, {
      attrs: {
        min: 5,
        max: 10,
      },
    });
    cy.get('[data-test*=ec-input-field__input]').invoke('attr', 'min').should('eq', '5');
    cy.get('[data-test*=ec-input-field__input]').invoke('attr', 'max').should('eq', '10');
  });

  it('works with the same listeners as the input', () => {
    const event = cy.spy().as('onClickSpy')
    mountInputField(
      {},
      {
        attrs: {
          onClick: event,
        }
      },
    );

    cy.get('[data-test*=ec-input-field__input]').click();
    cy.get('@onClickSpy').should('have.been.calledOnce')
  });

  it('should emit the value when you write on the input', () => {
    const event = cy.spy().as('onUpdateModelValueSpy')
    mountInputField(
      {
        modelValue: '',
        'onUpdate:modelValue': event
      },
    );

    cy.get('[data-test*=ec-input-field__input]').should('have.value', '');
    cy.get('[data-test*=ec-input-field__input]').type('some text');
    cy.get('@onUpdateModelValueSpy').should('have.been.calledWith', 'some text');
  });

  it('should emit an event when we click on the icon', () => {
    const event = cy.spy().as('onIconClick')
    mountInputField({ icon: 'simple-check' }, {
      attrs: {
        onIconClick: event
      }
    });

    cy.get('[data-test=ec-input-field__icon]').click();

    cy.get('@onIconClick').should('have.been.calledOnce');
  });

  it('should render given icon', () => {
    mountInputField({ icon: 'simple-check' });
    cy.get('[data-test=ec-input-field__icon-wrapper]').should('exist');
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('should render given icon with given size', () => {
    mountInputField({ icon: 'simple-check', iconSize: 40 });
    cy.get('[data-test=ec-input-field__icon-wrapper]').matchImageSnapshot();
  });

  it('should not render any icon if only the icon size is given', () => {
    mountInputField({ iconSize: 40 });
    cy.get('[data-test=ec-input-field__icon-wrapper]').should('not.exist');
  });


  it('renders properly when disabled', () => {
    mountInputField({}, { attrs: { disabled: true } });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly when readonly', () => {
    mountInputField({}, { attrs: { readonly: true } });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly when the labelTooltip prop is set', () => {
    mountInputField({ labelTooltip: 'Testing the labelTooltip prop' });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('should render with a sensitive class when isSensitive prop is set to true', () => {
    config.sensitiveClass = 'someSensitive';
    mountInputField({ isSensitive: true });
    cy.get('[data-test=ec-input-field__input]').should('have.class', 'someSensitive');
  });

  it('renders with bottom note', () => {
    mountInputField({ bottomNote: 'Random bottom note' });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders with warning bottom note', () => {
    mountInputField({ bottomNote: 'Random bottom note', isWarning: true });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders without bottom note if error message is given', () => {
    mountInputField({
      bottomNote: 'Random bottom note',
      errorMessage: 'Random error message',
    });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('renders properly custom attributes', () => {
    mountInputField({}, {
      attrs: {
        style: { backgroundColor: 'hotpink' },
      },
    });
    cy.get('[data-test=ec-input-field]').matchImageSnapshot();
  });

  it('should never assign undefined value to the input', () => {
    mountInputField({
      modelValue: undefined,
    });

    cy.get('[data-test=ec-input-field__input]').should('have.value', '');
  });

  it('should be focusable from outside', () => {
    mountInputField();

    cy.get('[data-test=ec-input-field__input]').should('not.be.focused');
    cy.get('[data-test=ec-input-field__label]').click();
    cy.get('[data-test=ec-input-field__input]').should('be.focused')
  });
});
