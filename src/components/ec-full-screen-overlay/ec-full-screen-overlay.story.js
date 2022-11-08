import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcFullScreenOverlay from './ec-full-screen-overlay.vue';

export default {
  title: 'Full Screen Overlay',
  component: EcFullScreenOverlay,
  decorators: [
    fixedContainerDecorator(),
  ],
};

const Template = ({ ...args }) => ({
  components: { EcFullScreenOverlay },
  setup() {
    return {
      args,
    };
  },
  template: `
    <ec-full-screen-overlay v-bind="args"></ec-full-screen-overlay>
  `,
});

export const basic = Template.bind({});
basic.args = {
  title: 'I am a title',
  show: true,
};

export const withSlots = args => ({
  components: { EcFullScreenOverlay },
  setup() {
    return { args };
  },
  template: `
  <ec-full-screen-overlay v-bind="args">
    <template #main>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a tristique enim. Nulla consequat vitae metus in ultricies. Curabitur dapibus, purus quis finibus rhoncus, purus augue blandit neque, quis fringilla urna justo consequat arcu. Nulla facilisi. Sed varius metus tempor, porta nunc in, pulvinar arcu. Duis quis lacus vehicula, lacinia arcu in, cursus tellus. Mauris vitae vestibulum risus. Morbi consectetur, sem eu vestibulum hendrerit, dui augue euismod lacus, in tincidunt eros neque aliquet tortor. Sed metus quam, rhoncus et mauris at, ultrices fringilla quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra feugiat pretium. Sed nisl justo, porttitor ut libero ut, consequat gravida massa. Nam feugiat lacinia justo vitae elementum. Sed augue turpis, rhoncus eget convallis at, dignissim at est.
    Vestibulum cursus fringilla urna vestibulum malesuada. Nam et malesuada dolor. Phasellus quis interdum lacus. Aenean ac ultrices nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed dapibus aliquet erat, sed suscipit mauris convallis vel. Duis ullamcorper suscipit pharetra. In at dapibus lacus. Donec est sem, volutpat a dolor eget, semper accumsan lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. Sed sed purus id nibh vulputate bibendum eu id eros. Quisque orci est, varius et ex ut, tristique posuere tellus. Praesent luctus urna mi, a fringilla odio faucibus sed. In sodales lorem tincidunt lectus tristique, id lacinia lacus porta.
    Nam leo ligula, auctor mollis posuere eget, fringilla lacinia felis. Curabitur dapibus id sapien non malesuada. Duis tellus elit, consectetur at lobortis at, lobortis in quam. Morbi gravida leo arcu, vel mattis nisi tincidunt vel. Nulla mattis nisl at tellus convallis, ut egestas lacus blandit. Nullam viverra justo varius accumsan accumsan. Sed et faucibus nulla. Nunc ultricies ut libero in posuere. In hac habitasse platea dictumst. Praesent quis purus nec augue tempor dapibus. Pellentesque non dui eu turpis iaculis ultrices. Nam porttitor nibh libero, et sollicitudin eros eleifend id. Duis dapibus erat at velit accumsan, vitae dapibus orci efficitur.
    Proin et quam purus. Sed sodales rhoncus justo quis molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam sit amet velit porta, ullamcorper ligula eu, laoreet nunc. Ut ac lectus consectetur, scelerisque quam id, ullamcorper mauris. Maecenas elit nisl, sagittis nec risus id, ultricies laoreet elit. In non nisl non sem eleifend placerat id ac elit. Nam nulla metus, euismod ac ante non, euismod pellentesque odio. Pellentesque a neque convallis, venenatis nulla vehicula, viverra ex.
    Quisque scelerisque, velit id ultrices finibus, lectus arcu tristique lectus, eget blandit turpis nisl at dolor. Phasellus ut leo sit amet erat lobortis vestibulum ut vel metus. Vestibulum sit amet eleifend nisl. Integer hendrerit nibh nisi, id rhoncus turpis vehicula quis. Nam semper metus dui, eget rhoncus nunc tincidunt in. Suspendisse eget aliquet eros. Donec pharetra malesuada dolor, at vestibulum purus dapibus vel. Nunc non ligula purus. Pellentesque posuere scelerisque mauris nec eleifend. Mauris eleifend posuere iaculis. Phasellus finibus lectus ac urna venenatis molestie. Pellentesque nec sem eu libero efficitur facilisis in non sapien. Sed consequat eu libero sed imperdiet.
    </template>
  </ec-full-screen-overlay>
  `,
});
withSlots.args = {
  title: 'I am a title',
  show: true,
};

