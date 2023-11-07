import { flushPromises, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, h } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import withAbortableFetch from './ec-with-abortable-fetch';

describe('EcWithAbortableFetch', () => {
  function mountEcWithAbortableFetch(props, mountOpts, customProps) {
    const Component = defineComponent({
      name: 'WrappedComponent',
      props: [customProps?.dataProp ?? 'data', customProps?.errorProp ?? 'error', customProps?.loadingProp ?? 'loading'],
      render() {
        return h('div');
      },
    });

    const hocWrapper = mount(withAbortableFetch(Component, customProps), {
      props,
      ...mountOpts,
    });

    const componentWrapper = hocWrapper.findComponent(Component);

    return { hocWrapper, componentWrapper };
  }

  it('should throw an error if dataSource prop is missing', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcWithAbortableFetch();
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "dataSource"');
    });
  });

  it('should throw an error if dataSource.fetch function is missing', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcWithAbortableFetch({ dataSource: {} });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "dataSource".');
    });
  });

  it('should throw an error if dataSource.fetch is not a function', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcWithAbortableFetch({ dataSource: { fetch: true } });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "dataSource".');
    });
  });

  it('should start fetching when created', () => {
    const dataSource = {
      fetch: vi.fn(),
    };

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource });
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
  });

  it('should stop fetching and pass the data to the component after dataSource gets resolved', async () => {
    const data = { prop: 1 };
    const dataSource = {
      fetch: vi.fn().mockResolvedValueOnce(data),
    };

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource });
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper).data).toEqual(data);
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
  });

  it('should stop fetching and pass the error to the component after dataSource gets rejected', async () => {
    const error = new Error('Random error');
    const dataSource = {
      fetch: vi.fn().mockRejectedValueOnce(error),
    };

    const errorSpy = vi.fn();

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      attrs: {
        onError: errorSpy,
      },
    });
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper).error).toBe(error);
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
    expect(errorSpy.mock.calls).toMatchSnapshot();
  });

  it('should not propagate the error when re-fetching after an error occurred', async () => {
    const error = new Error('Random error');
    const dataSource = {
      fetch: vi.fn().mockRejectedValueOnce(error).mockResolvedValueOnce({ result: 1 }),
    };

    const errorSpy = vi.fn();

    const { componentWrapper, hocWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      attrs: {
        onError: errorSpy,
      },
    });
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper).error).toBe(error);
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
    expect(errorSpy.mock.calls).toMatchSnapshot();

    dataSource.fetch.mockClear();
    errorSpy.mockClear();

    await hocWrapper.setProps({
      fetchArgs: { anotherProp: 2 },
    });

    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();

    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(getWrappedComponentState(componentWrapper).error).toBe(null);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should send the given fetch arguments', () => {
    const dataSource = {
      fetch: vi.fn(),
    };
    const fetchArgs = { prop: 1 };

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource, fetchArgs });
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
  });

  it('should re-fetch the data if arguments change', async () => {
    const dataSource = {
      fetch: vi.fn().mockResolvedValueOnce({ result: 1 }).mockResolvedValueOnce({ result: 2 }),
    };
    const fetchArgs = { prop: 1 };

    const { componentWrapper, hocWrapper } = mountEcWithAbortableFetch({ dataSource, fetchArgs });
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();

    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();

    dataSource.fetch.mockClear();

    await hocWrapper.setProps({
      fetchArgs: { anotherProp: 2 },
    });

    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();

    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
  });

  it('should abort previous fetch calls', async () => {
    const dataSource = {
      fetch: vi.fn()
        .mockImplementationOnce(() => new Promise((resolve) => {
          setImmediate(() => resolve({ result: 1 }));
        }))
        .mockImplementationOnce(() => new Promise((resolve) => {
          setImmediate(() => resolve({ result: 2 }));
        })),
    };
    const fetchArgs = { prop: 1 };
    const abortSpy = vi.fn();

    const { componentWrapper, hocWrapper } = mountEcWithAbortableFetch({ dataSource, fetchArgs }, {
      attrs: {
        onAbort: abortSpy,
      },
    });
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();

    const cancelToken = dataSource.fetch.mock.calls[0][1];
    expect(cancelToken).toBeInstanceOf(global.AbortSignal);
    cancelToken.addEventListener('abort', abortSpy);

    hocWrapper.setProps({
      fetchArgs: { anotherProp: 2 },
    });

    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    await flushPromises();
    await flushPromises(); // because of two mockImplementationOnce of the fetch
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(abortSpy).toHaveBeenCalledTimes(2);
  });

  it('should abort fetch call when destroyed', () => {
    const dataSource = {
      fetch: vi.fn(),
    };
    const abortSpy = vi.fn();

    const { componentWrapper, hocWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      attrs: {
        onAbort: abortSpy,
      },
    });

    const cancelToken = dataSource.fetch.mock.calls[0][1];
    expect(cancelToken).toBeInstanceOf(global.AbortSignal);
    cancelToken.addEventListener('abort', abortSpy);

    hocWrapper.unmount();

    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(abortSpy).toHaveBeenCalledTimes(2);
  });

  it('should stop fetching and keep the state intact if fetch for rejected because of AbortError', async () => {
    class AbortError extends Error {// AbortError is not exposed in the DOM
      constructor() {
        super();
        this.name = 'AbortError';
      }
    }
    const error = new AbortError();
    const dataSource = {
      fetch: vi.fn().mockRejectedValueOnce(error),
    };

    const errorSpy = vi.fn();

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      attrs: {
        onError: errorSpy,
      },
    });
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toHaveBeenCalledTimes(1);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should map the given custom props', async () => {
    const dataSource = {
      fetch: vi.fn().mockResolvedValueOnce({ result: 1 }),
    };
    const fetchArgs = { prop: 1 };
    const customProps = {
      dataProp: 'dataCustom',
      loadingProp: 'isLoadingCustom',
      errorProp: 'errorCustom',
    };
    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource, fetchArgs }, {}, customProps);
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('while loading');
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('after fetch');
  });

  it('should transform props using given data transform function', async () => {
    const dataSource = {
      fetch: vi.fn().mockResolvedValueOnce({ result: 1 }),
    };

    const dataTransform = vi.fn().mockImplementation(data => data ?? { result: 0 });

    const customProps = {
      dataTransform,
    };
    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {}, customProps);
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot('while loading');
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot('after fetch');
    expect(dataTransform).toHaveBeenCalledTimes(2);
    expect(dataTransform).toHaveBeenNthCalledWith(1, null);
    expect(dataTransform).toHaveBeenNthCalledWith(2, { result: 1 });
  });

  it('should transform props using given data transform function and pass them to given custom data prop', async () => {
    const dataSource = {
      fetch: vi.fn().mockResolvedValueOnce({ result: 1 }),
    };

    const dataTransform = vi.fn().mockImplementation(data => data ?? { result: 0 });

    const customProps = {
      dataTransform,
      dataProp: 'dataCustom',
    };
    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {}, customProps);
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('while loading');
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('after fetch');
    expect(dataTransform).toHaveBeenCalledTimes(2);
    expect(dataTransform).toHaveBeenNthCalledWith(1, null);
    expect(dataTransform).toHaveBeenNthCalledWith(2, { result: 1 });
  });

  it('should transform props using given error transform function', async () => {
    const error = new Error('Random error');
    const dataSource = {
      fetch: vi.fn().mockRejectedValueOnce(error),
    };

    const errorTransform = vi.fn().mockImplementation((err) => {
      if (err) {
        return `Custom error message (${err.message})`;
      }
      return null;
    });

    const customProps = {
      errorTransform,
    };
    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {}, customProps);
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot('while loading');
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot('after fetch');
    expect(errorTransform).toHaveBeenCalledTimes(2);
    expect(errorTransform).toHaveBeenNthCalledWith(1, null);
    expect(errorTransform).toHaveBeenNthCalledWith(2, error);
  });

  it('should transform props using given error transform function and pass them to given custom error prop', async () => {
    const error = new Error('Random error');
    const dataSource = {
      fetch: vi.fn().mockRejectedValueOnce(error),
    };

    const errorTransform = vi.fn().mockImplementation((err) => {
      if (err) {
        return `Custom error message (${err.message})`;
      }
      return null;
    });

    const customProps = {
      errorTransform,
      errorProp: 'errorCustom',
    };
    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {}, customProps);
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('while loading');
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('after fetch');
    expect(errorTransform).toHaveBeenCalledTimes(2);
    expect(errorTransform).toHaveBeenNthCalledWith(1, null);
    expect(errorTransform).toHaveBeenNthCalledWith(2, error);
  });

  it('should transform props using given loading transform function', async () => {
    const dataSource = {
      fetch: vi.fn().mockResolvedValueOnce({ result: 1 }),
    };

    const loadingTransform = vi.fn().mockImplementation(isLoading => !isLoading);

    const customProps = {
      loadingTransform,
    };
    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {}, customProps);
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot('while loading');
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot('after fetch');
    expect(loadingTransform).toHaveBeenCalledTimes(2);
    expect(loadingTransform).toHaveBeenNthCalledWith(1, true, null);
    expect(loadingTransform).toHaveBeenNthCalledWith(2, false, { result: 1 });
  });

  it('should transform props using given loading transform function and pass them to given custom loading prop and custom data prop', async () => {
    const dataSource = {
      fetch: vi.fn().mockResolvedValueOnce({ result: 1 }),
    };

    const loadingTransform = vi.fn().mockImplementation(isLoading => !isLoading);

    const customProps = {
      loadingTransform,
      loadingProp: 'loadingCustom',
      dataProp: 'dataCustom',
    };
    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {}, customProps);
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('while loading');
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot('after fetch');
    expect(loadingTransform).toHaveBeenCalledTimes(2);
    expect(loadingTransform).toHaveBeenNthCalledWith(1, true, null);
    expect(loadingTransform).toHaveBeenNthCalledWith(2, false, { result: 1 });
  });

  it('should stop fetching and map the custom error prop to the component after dataSource gets rejected', async () => {
    const error = new Error('Random error');
    const dataSource = {
      fetch: vi.fn().mockRejectedValueOnce(error),
    };

    const errorSpy = vi.fn();

    const customProps = {
      dataProp: 'dataCustom',
      loadingProp: 'isLoadingCustom',
      errorProp: 'errorCustom',
    };

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      attrs: {
        onError: errorSpy,
      },
    }, customProps);
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper, customProps)[customProps.errorProp]).toBe(error);
    expect(getWrappedComponentState(componentWrapper, customProps)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
    expect(errorSpy.mock.calls).toMatchSnapshot();
  });
});

function getWrappedComponentState(componentWrapper, { dataProp = 'data', loadingProp = 'loading', errorProp = 'error' } = {}) {
  const { [loadingProp]: loading, [dataProp]: data, [errorProp]: error } = componentWrapper.vm;
  return { [loadingProp]: loading, [dataProp]: data, [errorProp]: error };
}
