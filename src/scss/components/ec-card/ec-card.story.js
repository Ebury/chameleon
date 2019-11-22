import { storiesOf } from '@storybook/vue';
import EcIcon from '@/components/ec-icon';

const stories = storiesOf('Card', module);

stories
  .add('basic', () => ({
    components: { EcIcon },
    template: `
    <div style="display: flex; height: 100vh; margin: 10px">
      <div style="margin: auto; width: 33vw;">
        <div class="ec-card">
          Basic example card
        </div>
      </div>
    </div>
      `,
  }))
  .add('trade finance cards', () => ({
    components: { EcIcon },
    template: `
    <div style="display: flex; height: 100vh; margin: 10px">
      <div style="margin: 10px; width: 66vw;">
        <div class="ec-card">
          <div class="ec-p--8">
            <div style="font-size:25px; line-height: 35px;" class="ec-mb--24">
              Credit line: EUR 1,000,000.00
            </div>
            <ec-icon class="ec-mr--8" name="simple-check" :size="108" />
            <ec-icon class="ec-mr--8" name="simple-check" :size="14" />
            Used EUR 0.00
          </div>
        </div>
      </div>
      <div style="margin: 10px; width: 33vw;">
        <div class="ec-card" >
          <div style="text-align:center; font-size:18px; line-height: 28px;">
            Management account status 
          </div>
          <ec-icon class="ec-mt--24 ec-mb--24" name="simple-check" :size="48" />
          <div style="text-align:center;font-size: 14px; line-height: 20px;">
            Here we will display the status of your management accounts, so you can update them when necessary.
          </div>
        </div>
      </div>
    </div>`,
  }));
