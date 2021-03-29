jest.mock('../../src/directives/ec-tooltip', () => {
  function updateTooltipMock(el, value) {
    const dataTest = el.getAttribute('data-test') || '';
    if (!dataTest.includes('ec-tooltip-mock')) {
      el.setAttribute('data-test', `${dataTest} ec-mock ec-tooltip-mock`.trim());
    }

    let content = null;
    let placement = null;
    let classes = null;

    if (typeof value === 'string') {
      content = value;
    }

    if (typeof value === 'object' && value) {
      ({ placement, content, classes } = value);
    }

    if (content) {
      el.setAttribute('data-ec-tooltip-mock-content', content);
      if (placement) {
        el.setAttribute('data-ec-tooltip-mock-placement', placement);
      } else {
        el.removeAttribute('data-ec-tooltip-mock-placement');
      }
      if (classes) {
        el.setAttribute('data-ec-tooltip-mock-classes', classes);
      } else {
        el.removeAttribute('data-ec-tooltip-mock-classes');
      }
    } else {
      el.removeAttribute('data-ec-tooltip-mock-content');
      el.removeAttribute('data-ec-tooltip-mock-placement');
      el.removeAttribute('data-ec-tooltip-mock-classes');
    }
  }

  const EcTooltipDirectiveMock = {
    bind(el, { value }) {
      updateTooltipMock(el, value);
    },
    update(el, { value }) {
      updateTooltipMock(el, value);
    },
    unbind(el) {
      const dataTest = el.getAttribute('data-test') || '';
      el.setAttribute('data-test', dataTest.replace('ec-mock ec-tooltip-mock', '').trim());
      el.removeAttribute('data-ec-tooltip-mock-content');
      el.removeAttribute('data-ec-tooltip-mock-placement');
      el.removeAttribute('data-ec-tooltip-mock-classes');
    },
  };

  return EcTooltipDirectiveMock;
});
