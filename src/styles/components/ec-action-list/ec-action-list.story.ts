import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta = {
  title: 'Action List',
};

export default meta;

export const all: StoryFn = () => ({
  template: `
    <div class="tw-m-20">
      <h3 class="tw-ml-4">Horizontal</h3>

      <div class="ec-action-list-group">
        <div class="ec-action-list-item">
          <div>Action title</div>
          <div class="tw-text-gray-5">Lorem ipsum dolor consectutut</div>
        </div>

        <div class="ec-action-list-item">
          <div>Action title</div>
          <div class="tw-text-gray-5">Lorem ipsum dolor consectutut</div>
        </div>

        <div class="ec-action-list-item">
          <div>Action title</div>
          <div class="tw-text-gray-5">Lorem ipsum dolor consectutut</div>
        </div>
      </div>

      <h3 class="tw-mt-20 tw-ml-4">Vertical</h3>

      <div class="ec-action-list-group ec-action-list-group--column tw-w-1/3">
        <div class="ec-action-list-item">
          <div>Action title</div>
          <div class="tw-text-gray-5">Lorem ipsum dolor consectutur</div>
        </div>

        <div class="ec-action-list-item">
          <div>Action title</div>
          <div class="tw-text-gray-5">Lorem ipsum dolor consectutur</div>
        </div>

        <div class="ec-action-list-item">
          <div>Action title</div>
          <div class="tw-text-gray-5">Lorem ipsum dolor consectutur</div>
        </div>
      </div>
    </div>
  `,
});

all.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
