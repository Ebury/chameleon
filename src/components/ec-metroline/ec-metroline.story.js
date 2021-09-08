import EcMetroline from './ec-metroline.vue';
import EcMetrolineItem from '../ec-metroline-item';
import EcIcon from '../ec-icon/ec-icon.vue';
import EcBtn from '../ec-btn/ec-btn.vue';

export default {
  title: 'Metroline',
  component: EcMetroline,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcMetroline,
    EcMetrolineItem,
    EcIcon,
    EcBtn,
  },
  template: `
  <div class="tw-m-24 tw-flex tw-justify-center">
    <ec-metroline class="tw-max-w-screen-md">
        <ec-metroline-item
          :id="1"
          :badgeText="badgeText"
        >
          <template #heading>
            <span class="tw-mr-16">
              Transaction Information
            </span>
          </template>

          <template #sub-heading="{ isCompleted }">
            <span 
              v-if="isCompleted"
              class="tw-flex tw-items-center tw-mr-16">
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
              @click.prevent.stop 
              class="tw-flex tw-items-center"
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
              @click="goToNext"
              is-rounded>
              Continue
            </ec-btn>
          </template>
        </ec-metroline-item>

        <ec-metroline-item
          :id="2"
          :badgeText="badgeText"
        >
          <template #heading>
            <span class="tw-mr-16">
              Payee(s) information
            </span>
          </template>

          <template #sub-heading="{ isCompleted }">
            <span
              class="tw-flex tw-items-center tw-mr-16">
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
              class="tw-bg-gray-7 tw-min-h-104 tw-p-24">
              <h4>Summary</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            </div>
            <p v-else>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni!</p>
          </template>

          <template #footer-cta="{ goToNext, isActive }">
            <ec-btn
              v-if="isActive"
              category="primary"
              @click="goToNext"
              is-rounded>
              Continue
            </ec-btn>
          </template>
        </ec-metroline-item>

        <ec-metroline-item
          :id="3"
          :badgeText="badgeText"
        >
          <template #heading>
            <span class="tw-mr-16">
              Confirm
            </span>
          </template>

          <template #sub-heading="{ isCompleted }">
            <span
              class="tw-flex tw-items-center tw-mr-16">
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
              class="tw-bg-gray-7 tw-min-h-104 tw-p-24">
              <h4>Summary</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            </div>
            <p v-else>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni!</p>
          </template>

          <template #footer-cta="{ goToNext, isActive }">
            <ec-btn
              v-if="isActive"
              category="primary"
              @click="goToNext"
              is-rounded>Continue</ec-btn>
          </template>
        </ec-metroline-item>
    </ec-metroline>
  </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  badgeText: '',
};
