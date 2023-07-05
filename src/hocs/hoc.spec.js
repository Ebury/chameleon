import { mount } from '@vue/test-utils';
import { h } from 'vue';

import { createHOC, createHOCc } from './hoc';

describe('HoC for Vue 3', () => {
  describe('props', () => {
    it('should merge props', () => {
      const WrappedComponent = {
        props: {
          myProp: String,
          anotherProp: Object,
        },
      };
      const MyHoC = createHOC(WrappedComponent, {
        props: {
          anotherProp: Boolean,
        },
      });

      expect(MyHoC.props).toMatchObject({
        myProp: String,
        anotherProp: Boolean,
      });
    });

    it('should merge shorthand props', () => {
      const WrappedComponent = {
        props: ['myProp', 'anotherProp'],
      };

      const MyHoC = createHOC(WrappedComponent, {
        props: {
          anotherProp: Boolean,
        },
      });

      expect(MyHoC.props).toMatchObject({
        myProp: {},
        anotherProp: Boolean,
      });
    });

    it('should merge mixins props', () => {
      const WrappedComponent = {
        props: {
          prop1: String,
          prop2: Object,
        },
        mixins: [{
          props: ['prop3', 'prop4'],
        }, {
          props: { prop5: Array },
        }],
      };
      const MyHoC = createHOC(WrappedComponent, {
        props: {
          prop6: Boolean,
        },
      });

      expect(MyHoC.props).toMatchObject({
        prop1: String,
        prop2: Object,
        prop3: {},
        prop4: {},
        prop5: Array,
        prop6: Boolean,
      });
    });
  });

  describe('name', () => {
    it('should use given name', () => {
      const WrappedComponent = {
        name: 'Random WrappedComponent',
      };

      const MyHoC = createHOC(WrappedComponent, {
        name: 'Random HoC',
      });

      expect(MyHoC.name).toBe('Random HoC');
    });

    it('should fallback to wrapped component\'s name', () => {
      const WrappedComponent = {
        name: 'Random WrappedComponent',
      };

      const MyHoC = createHOC(WrappedComponent, {});

      expect(MyHoC.name).toBe('Random WrappedComponentHOC');
    });

    it('should generates its name', () => {
      const WrappedComponent = {};
      const MyHoC = createHOC(WrappedComponent, {});

      expect(MyHoC.name).toBe('AnonymousHOC');
    });
  });

  describe('render function', () => {
    it('should use given custom render function', () => {
      const wrappedRender = jest.fn();
      const WrappedComponent = {
        render: wrappedRender,
      };

      const hocRender = jest.fn();
      const MyHoC = createHOC(WrappedComponent, {
        render: hocRender,
      });

      mount(MyHoC);

      expect(hocRender).toHaveBeenCalledTimes(1);
      expect(wrappedRender).not.toHaveBeenCalled();
    });

    it('should generate a render function', () => {
      const wrappedRender = jest.fn();
      const WrappedComponent = {
        render: wrappedRender,
      };

      const MyHoC = createHOC(WrappedComponent, {});

      mount(MyHoC);

      expect(wrappedRender).toHaveBeenCalledTimes(1);
    });
  });

  describe('preserve existing functionality of wrapped component', () => {
    it('should render the wrapped component', () => {
      const WrappedComponent = {
        template: '<div>Wrapped component</div>',
      };

      const MyHoC = createHOC(WrappedComponent);
      const wrapper = mount(MyHoC);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass attrs to the wrapped component', () => {
      const WrappedComponent = {
        template: '<div>Wrapped component</div>',
      };

      const MyHoC = createHOC(WrappedComponent);

      const wrapper = mount(MyHoC, {
        attrs: {
          'data-test': 'my-component',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass props to the wrapped component', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent);

      const wrapper = mount(MyHoC, {
        props: {
          myProp: 'Random value',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass slots to the wrapped component', () => {
      const WrappedComponent = {
        template: `
          <div>
            <slot name="first" v-bind="{ slotProp: 123 }">First slot fallback</slot>
            <slot>Default slot fallback</slot>
            <slot name="third">Third slot fallback</slot>
          </div>
        `,
      };

      const MyHoC = createHOC(WrappedComponent);

      const wrapper = mount(MyHoC, {
        slots: {
          first: ({ slotProp }) => h('div', `Slot prop value: ${slotProp}`),
          default: () => h('div', 'Default slot'),
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass slots to the wrapped component via template', () => {
      const WrappedComponent = {
        template: `
          <div>
            <slot name="first" v-bind="{ slotProp: 123 }">First slot fallback</slot>
            <slot>Default slot fallback</slot>
            <slot name="third">Third slot fallback</slot>
          </div>
        `,
      };

      const MyHoc = createHOC(WrappedComponent);

      const Wrapper = {
        components: { MyHoc },
        template: `
          <my-hoc>
            <template #first="{ slotProp }">Slot prop value: {{ slotProp }}</template>
            <div>Default slot</div>
          </my-hoc>
        `,
      };

      const wrapper = mount(Wrapper);

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass event listeners to the wrapped component', async () => {
      const WrappedComponent = {
        template: `
          <div>
            <button data-test="my-button" @click="$emit('custom', 123)">Click me</button>
          </div>
        `,
      };

      const MyHoC = createHOC(WrappedComponent);

      const customSpy = jest.fn();
      const wrapper = mount(MyHoC, {
        attrs: {
          onCustom: customSpy,
        },
      });

      await wrapper.findByDataTest('my-button').trigger('click');

      expect(customSpy).toHaveBeenCalledTimes(1);
      expect(customSpy).toHaveBeenCalledWith(123);
    });
  });

  describe('render props', () => {
    it('should throw an error if the props form is not supported', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        props: 123,
      });

      expect(() => {
        mount(MyHoC);
      }).toThrow('Unrecognised props form in HoC: number');
    });

    it('should pass props to the wrapped component', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        props: {
          myProp() {
            return 'Random Value';
          },
        },
      });

      const wrapper = mount(MyHoC);

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should override props when passing custom value to the wrapped component', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        props: {
          myProp() {
            return 'Random Value';
          },
        },
      });

      const wrapper = mount(MyHoC, {
        props: {
          myProp: 'Mounting value',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass props to the wrapped component via props function', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        props(props) {
          return {
            ...props,
            myProp: 'Random Value',
          };
        },
      });

      const wrapper = mount(MyHoC);

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should override props when passing custom value to the wrapped component via props function', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        props(props) {
          return {
            ...props,
            myProp: 'Random Value',
          };
        },
      });

      const wrapper = mount(MyHoC, {
        props: {
          myProp: 'Mounting value',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should be able to access "this" in props function', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        props(props) {
          return {
            ...props,
            myProp: `${this.$props.myProp}:${this.myProp}:Random Value`,
          };
        },
      });

      const wrapper = mount(MyHoC, {
        props: {
          myProp: 'Mounting value',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should be able to access "this" in individual props function', () => {
      const WrappedComponent = {
        props: { myProp: String },
        template: '<div>{{ myProp }}</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        props: {
          myProp() {
            return `${this.$props.myProp}:${this.myProp}:Random Value`;
          },
        },
      });

      const wrapper = mount(MyHoC, {
        props: {
          myProp: 'Mounting value',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('render listeners', () => {
    it('should throw an error if the props form is not supported', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        listeners: 123,
      });

      expect(() => {
        mount(MyHoC);
      }).toThrow('Unrecognised listeners form in HoC: number');
    });

    it('should throw an error if the listener name is in kebab-case', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
      };

      const myEventSpy = jest.fn();
      const MyHoC = createHOC(WrappedComponent, {}, {
        listeners: {
          'my-event': myEventSpy,
        },
      });

      expect(() => {
        mount(MyHoC);
      }).toThrow('Listener "my-event" should be in camelCase.');
    });

    it('should pass the listener to the wrapped component', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
        mounted() {
          this.$emit('my-mounted', 123);
        },
      };

      const myMountedSpy = jest.fn();
      const MyHoC = createHOC(WrappedComponent, {}, {
        listeners: {
          myMounted: myMountedSpy,
        },
      });

      mount(MyHoC);
      expect(myMountedSpy).toHaveBeenCalledTimes(1);
      expect(myMountedSpy).toHaveBeenCalledWith(123);
    });

    it('should not automatically re-emit the event to the HoCs parent', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
        emits: ['my-mounted'],
        mounted() {
          this.$emit('my-mounted', 123);
        },
      };

      const myMountedSpy = jest.fn();
      const MyHoC = createHOC(WrappedComponent, {
        inheritAttrs: false,
      }, {
        listeners: {
          myMounted: myMountedSpy,
        },
      });

      const parentSpy = jest.fn();
      mount(MyHoC, {
        attrs: {
          onMyMounted: parentSpy,
        },
      });
      expect(myMountedSpy).toHaveBeenCalledTimes(1);
      expect(parentSpy).not.toHaveBeenCalled();
    });

    it('should re-emit the event to the HoCs parent', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
        emits: ['my-mounted'],
        mounted() {
          this.$emit('my-mounted', 123);
        },
      };

      const myMountedSpy = jest.fn().mockImplementationOnce(function hocListener(n) {
        this.$emit('my-mounted', n ** 2);
      });

      const MyHoC = createHOC(WrappedComponent, {
        emits: ['my-mounted'],
        inheritAttrs: false,
      }, {
        listeners: {
          myMounted: myMountedSpy,
        },
      });

      const parentSpy = jest.fn();
      mount(MyHoC, {
        attrs: {
          onMyMounted: parentSpy,
        },
      });
      expect(myMountedSpy).toHaveBeenCalledTimes(1);
      expect(myMountedSpy).toHaveBeenCalledWith(123);
      expect(parentSpy).toHaveBeenCalledTimes(1);
      expect(parentSpy).toHaveBeenCalledWith(15129);
    });

    it('should be able to access "this" in listeners function', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
        mounted() {
          this.$emit('my-mounted', 123);
        },
      };

      const myMountedSpy = jest.fn();
      const MyHoC = createHOC(WrappedComponent, {
        data() {
          return { customData: 456 };
        },
      }, {
        listeners: {
          myMounted(n) {
            myMountedSpy(n, this.customData);
          },
        },
      });

      mount(MyHoC);
      expect(myMountedSpy).toHaveBeenCalledTimes(1);
      expect(myMountedSpy).toHaveBeenCalledWith(123, 456);
    });
  });

  describe('render slots', () => {
    it('should throw an error if the slots form is not supported', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        slots: {},
      });

      expect(() => {
        mount(MyHoC);
      }).toThrow('Unrecognised slots form in HoC: object');
    });

    it('should throw an error if the slots are passed as scopedSlots', () => {
      const WrappedComponent = {
        template: '<div>Wrapped Component</div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        scopedSlots: () => {},
      });

      expect(() => {
        mount(MyHoC);
      }).toThrow('Do not use scopedSlots in render options. Rename it to slots.');
    });

    it('should pass the slot to the wrapped component', () => {
      const WrappedComponent = {
        template: '<div><slot>Default fallback</slot></div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        slots(slots) {
          return {
            ...slots,
            default: () => 'Default slot from HoC',
          };
        },
      });

      const wrapper = mount(MyHoC);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass a named scoped slot to the wrapped component', () => {
      const WrappedComponent = {
        template: '<div><slot name="custom" v-bind="{ customProp: 123 }">Custom slot fallback</slot></div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        slots(slots) {
          return {
            ...slots,
            custom: ({ customProp }) => `Custom slot from HoC with customProp set to ${customProp}`,
          };
        },
      });

      const wrapper = mount(MyHoC);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should override slot passed to the wrapped component', () => {
      const WrappedComponent = {
        template: '<div><slot>Default fallback</slot></div>',
      };

      const MyHoC = createHOC(WrappedComponent, {}, {
        slots(slots) {
          return {
            ...slots,
            default: () => 'Default slot from HoC',
          };
        },
      });

      const wrapper = mount(MyHoC, {
        slots: {
          default: () => 'Default slot from mounting',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should be able to access "this" in slots function', () => {
      const WrappedComponent = {
        template: '<div><slot>Default fallback</slot></div>',
      };

      const MyHoC = createHOC(WrappedComponent, {
        data() {
          return {
            customData: 123,
          };
        },
      }, {
        slots(slots) {
          return {
            ...slots,
            default: () => h('span', `Custom data: ${this.customData}`),
          };
        },
      });

      const wrapper = mount(MyHoC, {
        props: {
          myProp: 'Mounting value',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('curried', () => {
    it('should create a curried version of createHOC', () => {
      const myHocFn = createHOCc({
        props: ['hocProp'],
      }, {
        props(props) {
          return {
            ...props,
            myProp: this.hocProp,
            hocProp: null,
          };
        },
      });

      expect(myHocFn).toBeInstanceOf(Function);

      const WrappedComponent = {
        props: ['myProp'],
        template: '<div>Wrapped component, {{ myProp }}</div>',
      };

      const MyHoC = myHocFn(WrappedComponent);
      const wrapper = mount(MyHoC, {
        props: { hocProp: 123 },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
