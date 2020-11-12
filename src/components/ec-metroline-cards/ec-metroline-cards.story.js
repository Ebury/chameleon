import EcMetrolineCards from './ec-metroline-cards.vue';
import EcIcon from '../ec-icon';
import EcMetrolineCard from '../ec-metroline-card';

export default {
  title: 'Metroline Cards',
  component: EcMetrolineCards,
};

export const basic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcIcon, EcMetrolineCards, EcMetrolineCard },
  template: `
    <div class="tw-flex tw-flex-col">
      <ec-metroline-cards>
        <ec-metroline-card
          :has-narrow-padding="true"
          :is-first="true"
          :is-collapsed="true"
          :is-stand-alone="false"
        >
          <template>
            <div class="tw-text-gray-5 tw-mb-8">PI123123</div>
            <div class="tw-flex">
              <div class="tw-flex-auto">
                <div class="tw-inline-block tw-align-top tw-mr-4">
                  <ec-icon
                    name="simple-person"
                    :size="16"
                    class="tw-fill-gray-5"
                  />
                </div>
                <div class="tw-inline-block">
                  <div class="tw-caption-text">Beneficiary</div>
                  <div class="tw-small-text">Beneficiary name</div>
                </div>
              </div>
              <div class="tw-flex-auto">
                <div class="tw-inline-block tw-align-top tw-mr-4">
                  <ec-icon
                    name="simple-collect"
                    :size="16"
                    class="tw-fill-gray-5"
                  />
                </div>
                <div class="tw-inline-block">
                  <div class="tw-caption-text">Amount</div>
                  <div class="tw-small-text">USD 2,400.00</div>
                </div>
              </div>
              <div class="tw-flex-auto">
                <div class="tw-inline-block tw-align-top tw-mr-4">
                  <ec-icon
                    name="simple-batch-payment"
                    :size="16"
                    class="tw-fill-gray-5"
                  />
                </div>
                <div class="tw-inline-block">
                  <div class="tw-caption-text">Fee</div>
                  <div class="tw-small-text">GBP 5.00</div>
                </div>
              </div>
            </div>
          </template>
        </ec-metroline-card>

        <ec-metroline-card
          :has-narrow-padding="true"
          :is-stand-alone="false"
        >
          <template>
            <div class="tw-text-center">
              <h2 class="tw-mb-8">EUR 2,000.00</h2>
              <div class="tw-mb-8">Will be deducted from your EUR Balance on DD/MM/AAAA</div>
              <div class="tw-caption-text">Available funds on your EUR Balance now: EUR 3,000.00</div>
            </div>
          </template>
        </ec-metroline-card>

        <ec-metroline-card
          :has-narrow-padding="true"
          :is-last="true"
          :is-stand-alone="false"
        >
          <template>
            This amount will be deducted from your EUR balance. If there are not enough funds available on this date, this payment will not be released until there are.
          </template>
        </ec-metroline-card>
      </ec-metroline-cards>
    </div>
  `,
});

basic.args = {};
