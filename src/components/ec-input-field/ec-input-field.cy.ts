/// <reference types="cypress-image-snapshot" />
import { EcInputField } from '../../main';
import type { InputFieldProps } from './types';

import 'tailwindcss/dist/tailwind.min.css';
import '../../styles/main.css';
import '../../styles/themes/blue.css';

describe('InputField', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should display properly with the given props', () => {
    cy.mount<InputFieldProps>(
      EcInputField,
      {
        props: { modelValue: 'Some text' },
      },
    );

    cy.get('[data-test*=ec-input-field__input]').invoke('attr', 'autocomplete').should('eq', undefined);
    cy.get('[data-test*=ec-input-field__input]').matchImageSnapshot();
  });
});

