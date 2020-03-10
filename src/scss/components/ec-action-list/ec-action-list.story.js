import { storiesOf } from '@storybook/vue';

const stories = storiesOf('Action List', module);

stories
  .add('vertical', () => ({
    template: `
    <div style="display: flex; height: 100vh; margin: 10px">
      <div style="margin: auto; width: 33vw;">
        <div class="ec-action-list-group ec-action-list-group--column">
          <div class="ec-action-list-item">
            <div>Action title</div>
            <div style="color: #86989c;">Lorem ipsum dolor consectutur</div>
          </div>
          <div class="ec-action-list-item">
            <div>Action title</div>
            <div style="color: #86989c;">Lorem ipsum dolor consectutur</div>
          </div>
          <div class="ec-action-list-item">
            <div>Action title</div>
            <div style="color: #86989c;">Lorem ipsum dolor consectutur</div>
          </div>
        </div>
      </div>
    </div>
      `,
  }))
  .add('horizontal', () => ({
    template: `
    <div style="display: flex; height: 100vh; margin: 10px">
      <div style="margin: auto; width: 66vw;">
        <div class="ec-action-list-group">
          <div class="ec-action-list-item">
            <div>Action title</div>
            <div style="color: #86989c;">Lorem ipsum dolor consectutut</div>
          </div>
          <div class="ec-action-list-item">
            <div>Action title</div>
            <div style="color: #86989c;">Lorem ipsum dolor consectutut</div>
          </div>
          <div class="ec-action-list-item">
            <div>Action title</div>
            <div style="color: #86989c;">Lorem ipsum dolor consectutut</div>
          </div>
        </div>
      </div>
    </div>
      `,
  }));
