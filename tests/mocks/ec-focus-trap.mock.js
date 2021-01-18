jest.mock('../../src/directives/ec-focus-trap', () => {
  const EcFocusTrapDirectiveMock = {
    bind(el) {
      const dataTest = el.getAttribute('data-test') || '';
      if (!dataTest.includes('ec-focus-trap-mock')) {
        el.setAttribute('data-test', `${dataTest} ec-mock ec-focus-trap-mock`.trim());
      }
    },
    unbind(el) {
      const dataTest = el.getAttribute('data-test') || '';
      el.setAttribute('data-test', dataTest.replace('ec-mock ec-focus-trap-mock', '').trim());
    },
  };

  return EcFocusTrapDirectiveMock;
});
