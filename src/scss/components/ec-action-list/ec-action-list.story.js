import { storiesOf } from '@storybook/vue';

const stories = storiesOf('Action List', module);

stories
  .add('all', () => ({
    template: `
    <div>
      <div class="ec-m--20">
        <h3 style="margin-left:4px;">Horizontal</h3>

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

        <h3 style="margin: 20px 0 4px">Vertical</h3>

        <div class="ec-action-list-group ec-action-list-group--column" style="max-width:33vw;" >
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
    </div>
      `,
  }));
