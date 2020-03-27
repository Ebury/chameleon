<template>
  <div class="ec-swift">

    <div class="ec-swift__content">
      <div class="ec-swift__uetr">Transaction history for UETR</div>
      <ec-dropdown
        v-model="selectedUetr"
        v-bind="$props"
        @change="onSelected"
      />

      <div
        v-if="transferStatus"
        class="ec-swift__cards"
      >
        <div
          v-for="(item, index) in transferStatus.statuses"
          :key="index"
        >
          <div class="ec-card ec-swift__card">
            <div class="ec-p--8">
              {{ item.status }}
            </div>
            <ec-icon
              class="ec-mt--24 ec-mb--24"
              name="simple-check"
              :size="48"
            />
            <div class="ec-p--8">
              {{ item.createdAt }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import EcIcon from '../ec-icon';
import EcDropdown from '../ec-dropdown';

export default {
  name: 'EcSwift',
  components: {
    EcIcon,
    EcDropdown,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    swiftProxyUrl: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      accessToken: null,
      refreshToken: null,
      transferStatus: null,
      selectedUetr: '',
    };
  },
  computed: {
  },
  async created() {
    const loginUrl = `${this.swiftProxyUrl}/api/token/`;
    const payload = {
      username: this.username,
      password: this.password,
    };

    await axios
      .post(loginUrl, payload)
      .then((response) => {
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;
      });

    await this.loadTransfer();
  },
  methods: {
    async loadTransfer() {
      if (!this.selectedUetr) return;

      const transferUrl = `${this.swiftProxyUrl}/transfers/${this.selectedUetr.text}`;
      const authToken = `Bearer ${this.accessToken}`;
      await axios
        .get(transferUrl, { headers: { Authorization: authToken } })
        .then((response) => {
          this.transferStatus = response.data;
        });
    },
    async onSelected() {
      await this.loadTransfer();
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors';
@import '../../scss/tools/borders';
@import '../../scss/tools/typography';

.ec-swift {
  @include shape-border-radius;

  padding: 16px;
  fill: $white;
  position: relative;
  display: flex;
  align-items: center;
  align-content: center;

  &__content {
    flex-grow: 4;
    text-align: center;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__card {
    flex: 0 1 10%;
    margin: 10px;
  }

  &__uetr {
    @include body-strong;
  }
}
</style>
