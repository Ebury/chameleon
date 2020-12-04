import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import { withMockedConsole } from '../../../tests/utils/console';
import withAbortableFetch from './ec-with-abortable-fetch';
import flushPromises from '../../../tests/utils/flush-promises';

describe('EcWithAbortableFetch', () => {
  function mountEcWithAbortableFetch(props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      props: ['data', 'error', 'loading'],
      render(h) {
        return h('div');
      },
    });

    const hocWrapper = mount(withAbortableFetch(Component), {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });

    const componentWrapper = createWrapper(hocWrapper.vm.$children[0].$vnode);

    return { hocWrapper, componentWrapper };
  }

  it('should throw an error if dataSource prop is missing', () => {
    withMockedConsole((errorSpy) => {
      mountEcWithAbortableFetch();
      expect(errorSpy).toMatchSnapshot();
    });
  });

  it('should throw an error if dataSource.fetch function is missing', () => {
    withMockedConsole((errorSpy) => {
      mountEcWithAbortableFetch({ dataSource: {} });
      expect(errorSpy).toMatchSnapshot();
    });
  });

  it('should throw an error if dataSource.fetch is not a function', () => {
    withMockedConsole((errorSpy) => {
      mountEcWithAbortableFetch({ dataSource: { fetch: true } });
      expect(errorSpy).toMatchSnapshot();
    });
  });

  it('should start fetching when created', () => {
    const dataSource = {
      fetch: jest.fn(),
    };

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource });
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
  });

  it('should stop fetching and pass the data to the component after dataSource gets resolved', async () => {
    const data = { prop: 1 };
    const dataSource = {
      fetch: jest.fn().mockResolvedValueOnce(data),
    };

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource });
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper).data).toBe(data);
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
  });

  it('should stop fetching and pass the error to the component after dataSource gets rejected', async () => {
    const error = new Error('Random error');
    const dataSource = {
      fetch: jest.fn().mockRejectedValueOnce(error),
    };

    const errorSpy = jest.fn();

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      listeners: {
        error: errorSpy,
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
      fetch: jest.fn().mockRejectedValueOnce(error).mockResolvedValueOnce({ result: 1 }),
    };

    const errorSpy = jest.fn();

    const { componentWrapper, hocWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      listeners: {
        error: errorSpy,
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

  it('should send the given fetch arguments', async () => {
    const dataSource = {
      fetch: jest.fn(),
    };
    const fetchArgs = { prop: 1 };

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource, fetchArgs });
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toMatchSnapshot();
  });

  it('should re-fetch the data if arguments change', async () => {
    const dataSource = {
      fetch: jest.fn().mockResolvedValueOnce({ result: 1 }).mockResolvedValueOnce({ result: 2 }),
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
      fetch: jest.fn().mockResolvedValueOnce({ result: 1 }).mockResolvedValueOnce({ result: 2 }),
    };
    const fetchArgs = { prop: 1 };
    const abortSpy = jest.fn();

    const { componentWrapper, hocWrapper } = mountEcWithAbortableFetch({ dataSource, fetchArgs }, {
      listeners: {
        abort: abortSpy,
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
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(abortSpy).toHaveBeenCalledTimes(2);
  });

  it('should abort fetch call when destroyed', () => {
    const dataSource = {
      fetch: jest.fn(),
    };
    const abortSpy = jest.fn();

    const { componentWrapper, hocWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      listeners: {
        abort: abortSpy,
      },
    });

    const cancelToken = dataSource.fetch.mock.calls[0][1];
    expect(cancelToken).toBeInstanceOf(global.AbortSignal);
    cancelToken.addEventListener('abort', abortSpy);

    hocWrapper.destroy();

    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(abortSpy).toHaveBeenCalledTimes(2);
  });

  it('should stop fetching and keep the state intact if fetch for rejected because of AbortError', async () => {
    class AbortError extends Error { // AbortError is not exposed in the DOM
        name = 'AbortError'
    }
    const error = new AbortError();
    const dataSource = {
      fetch: jest.fn().mockRejectedValueOnce(error),
    };

    const errorSpy = jest.fn();

    const { componentWrapper } = mountEcWithAbortableFetch({ dataSource }, {
      listeners: {
        error: errorSpy,
      },
    });
    await flushPromises();
    expect(getWrappedComponentState(componentWrapper)).toMatchSnapshot();
    expect(dataSource.fetch).toHaveBeenCalledTimes(1);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

function getWrappedComponentState(componentWrapper) {
  const { loading, data, error } = componentWrapper.vm;
  return { loading, data, error };
}
