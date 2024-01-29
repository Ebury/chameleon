
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { toRefs } from 'vue';

import EcBtn from '../ec-btn/ec-btn.vue';
import EcIcon from '../ec-icon/ec-icon.vue';
import EcMetrolineItem from './components/ec-metroline-item';
import EcMetroline from './ec-metroline.vue';

export default {
  title: 'Metroline',
  component: EcMetroline,
} as Meta<typeof EcMetroline>;

type EcMetrolineStory = StoryFn<{
  badgeText: string,
}>;

export const basic: EcMetrolineStory = storyArgs => ({
  components: {
    EcMetroline,
    EcMetrolineItem,
    EcIcon,
    EcBtn,
  },
  setup() {
    const { badgeText } = toRefs(storyArgs);

    return {
      badgeText,
      onChange: action('change'),
      onComplete: action('complete'),
      onAddDescription: action('add description'),
    };
  },
  template: `
    <div class="tw-m-24 tw-flex tw-justify-center">
      <ec-metroline
        class="tw-max-w-screen-md"
        v-on="{
          change: onChange,
          complete: onComplete,
        }"
      >
        <ec-metroline-item
          :id="1"
          :badge-text="badgeText"
        >
          <template #heading>
            <span class="tw-mr-16">
              Transaction Information
            </span>
          </template>

          <template #sub-heading="{ isCompleted }">
            <span
              v-if="isCompleted"
              class="tw-flex tw-items-center tw-mr-16"
            >
              <ec-icon name="simple-check" class="tw-fill-current tw-mr-8" :size="16" />
              Amount fully allocated
            </span>
          </template>

          <template #header-cta="{ activateItem, isCompleted, isReadOnly }">
            <a
              v-if="isCompleted && !isReadOnly"
              href="#"
              class="tw-flex tw-items-center"
              @click.prevent.stop="activateItem"
            >
              <ec-icon name="simple-edit" class="tw-fill-current tw-mr-8" :size="24" />
              Edit
            </a>

            <a
              v-else-if="isCompleted"
              href="#"
              class="tw-flex tw-items-center"
              @click.prevent.stop="onAddDescription"
            >
              Add Description
            </a>
          </template>

          <template #main="{ isCompleted }">
            <div v-if="isCompleted" class="tw-bg-gray-7 tw-min-h-104 tw-p-24">
              <h4>Summary</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            </div>
            <p v-else>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni!</p>
          </template>

          <template #footer-cta="{ goToNext, isActive }">
            <ec-btn
              v-if="isActive"
              category="primary"
              is-rounded
              @click="goToNext"
            >
              Continue
            </ec-btn>
          </template>
        </ec-metroline-item>

        <ec-metroline-item
          :id="2"
          :badge-text="badgeText"
        >
          <template #heading>
            <span class="tw-mr-16">
              Payee(s) information
            </span>
          </template>

          <template #sub-heading="{ isCompleted }">
            <span
              class="tw-flex tw-items-center tw-mr-16"
            >
              <ec-icon name="simple-check" class="tw-fill-current tw-mr-8" :size="16" />
              Amount fully allocated
            </span>
          </template>

          <template #header-cta="{ activateItem, isCompleted, isReadOnly }">
            <a
              v-if="isCompleted && !isReadOnly"
              href="#"
              class="tw-flex tw-items-center"
              @click.prevent.stop="activateItem"
            >
              <ec-icon name="simple-edit" class="tw-fill-current tw-mr-8" :size="24" />
              Edit
            </a>
          </template>

          <template #main="{ isCompleted }">
            <div
              v-if="isCompleted"
              class="tw-bg-gray-7 tw-min-h-104 tw-p-24"
            >
              <h4>Summary</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            </div>
            <p v-else>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni!</p>
          </template>

          <template #footer-cta="{ goToNext, isActive }">
            <ec-btn
              v-if="isActive"
              category="primary"
              is-rounded
              @click="goToNext"
            >
              Continue
            </ec-btn>
          </template>
        </ec-metroline-item>

        <ec-metroline-item
          :id="3"
          :badge-text="badgeText"
        >
          <template #heading>
            <span class="tw-mr-16">
              Confirm
            </span>
          </template>

          <template #sub-heading="{ isCompleted }">
            <span
              class="tw-flex tw-items-center tw-mr-16"
            >
              <ec-icon name="simple-check" class="tw-fill-current tw-mr-8" :size="16" />
              Amount fully allocated
            </span>
          </template>

          <template #header-cta="{ activateItem, isCompleted, isReadOnly }">
            <a
              v-if="isCompleted && !isReadOnly"
              href="#"
              class="tw-flex tw-items-center"
              @click.prevent.stop="activateItem"
            >
              <ec-icon name="simple-edit" class="tw-fill-current tw-mr-8" :size="24" />
              Edit
            </a>
          </template>

          <template #main="{ isCompleted }">
            <div
              v-if="isCompleted"
              class="tw-bg-gray-7 tw-min-h-104 tw-p-24"
            >
              <h4>Summary</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            </div>
            <p v-else>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni!</p>
          </template>

          <template #footer-cta="{ goToNext, isActive }">
            <ec-btn
              v-if="isActive"
              category="primary"
              is-rounded
              @click="goToNext"
            >Continue</ec-btn>
          </template>
        </ec-metroline-item>
      </ec-metroline>
    </div>
  `,
});

basic.args = {
  badgeText: '',
};
