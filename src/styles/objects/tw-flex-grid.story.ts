import type { Meta, StoryObj } from '@storybook/vue3';

import './tw-flex-grid.story.css';

const meta: Meta = {
  title: 'CSS/Flexbox Grid',
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
  },
};

export default meta;

export const Basic: StoryObj = {
  render() {
    return {
      template: `
        <div class="ec-flex-grid-story">
          <h1 class="ec-flex-grid-story__title">12 Columns - 24 pixel gutters</h1>
          <h2 class="ec-flex-grid-story__title">Parent: "tw-flex-grid", Children: "tw-flex-col; tw-flex-col-[N,full,auto]; tw-flex-col-offset-[N]"</h2>

          <h2 class="ec-flex-grid-story__title">Normal</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div
                v-for="i in 12"
                class="tw-flex-col-1">
                <div class="ec-flex-grid-story__column">.tw-flex-col-1<div>{{ i }}</div></div>
              </div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Wrap</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div
                v-for="i in 18"
                class="tw-flex-col-1">
                <div class="ec-flex-grid-story__column">.tw-flex-col-1<div>{{ i }}</div></div>
              </div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Offset</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div class="tw-flex-col-offset-1 tw-flex-col-1"><div class="ec-flex-grid-story__column">.tw-flex-col-offset-1.tw-flex-col-1</div></div>
              <div class="tw-flex-col-offset-2 tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-offset-2.tw-flex-col-2</div></div>
              <div class="tw-flex-col-offset-4 tw-flex-col-1"><div class="ec-flex-grid-story__column">.tw-flex-col-offset-4.tw-flex-col-1</div></div>
              <div class="tw-flex-col-offset-2 tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-offset-4.tw-flex-col-2</div></div>
              <div class="tw-flex-col-offset-3 tw-flex-col-5"><div class="ec-flex-grid-story__column">.tw-flex-col-offset-3.tw-flex-col-5</div></div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Equal spread</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div
                v-for="i in 4"
                class="tw-flex-col-spread">
                <div class="ec-flex-grid-story__column">.tw-flex-col-spread</div>
              </div>
              <div class="tw-flex-col-4">
                <div class="ec-flex-grid-story__column">.tw-flex-col-4</div>
              </div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Equal spread with line break</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div
                v-for="i in 3"
                class="tw-flex-col-spread">
                <div class="ec-flex-grid-story__column">.tw-flex-col-spread</div>
              </div>
              <div class="tw-w-full"></div>
              <div
                v-for="i in 2"
                class="tw-flex-col-spread">
                <div class="ec-flex-grid-story__column">.tw-flex-col-spread</div>
              </div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Various column combinations</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
              <div class="tw-flex-col-4"><div class="ec-flex-grid-story__column">.tw-flex-col-4</div></div>
              <div class="tw-flex-col-5"><div class="ec-flex-grid-story__column">.tw-flex-col-5</div></div>
              <div class="tw-flex-col-3"><div class="ec-flex-grid-story__column">.tw-flex-col-3</div></div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Full width</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div class="tw-flex-col-12"><div class="ec-flex-grid-story__column">.tw-flex-col-12</div></div>
              <div class="tw-flex-col-12"><div class="ec-flex-grid-story__column">.tw-flex-col-12</div></div>
              <div class="tw-flex-col-full"><div class="ec-flex-grid-story__column">.tw-flex-col-full</div></div>
              <div class="tw-flex-col-full"><div class="ec-flex-grid-story__column">.tw-flex-col-full</div></div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Auto width</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
              <div class="tw-flex-col-auto"><div class="ec-flex-grid-story__column">.tw-flex-col-auto</div></div>
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">In grid container (.tw-flex-grid-container)</h2>
          <div class="ec-flex-grid-story__container tw-flex-grid-container">
            <div class="tw-flex-grid">
              <div
                v-for="i in 12"
                class="tw-flex-col-1">
                <div class="ec-flex-grid-story__column">.tw-flex-col-1<div>{{ i }}</div></div>
              </div>
            </div>
          </div>
        </div>
      `,
    };
  },
};

export const Alignments: StoryObj = {
  render() {
    return {
      template: `
        <div class="ec-flex-grid-story">
          <h1 class="ec-flex-grid-story__title">Vertical/horizontal alignment</h1>

          <h2 class="ec-flex-grid-story__title">Vertical alignment</h2>
          <div class="ec-flex-grid-story__container ec-flex-grid-story__container--with-border">
            <h3>.tw-items-start</h3>
            <div class="tw-flex-grid tw-items-start" style="height: 250px;">
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
            </div>
          </div>
          <div class="ec-flex-grid-story__container ec-flex-grid-story__container--with-border">
            <h3>.tw-items-center</h3>
            <div class="tw-flex-grid tw-items-center" style="height: 250px;">
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
            </div>
          </div>
          <div class="ec-flex-grid-story__container ec-flex-grid-story__container--with-border">
            <h3>.tw-items-end</h3>
            <div class="tw-flex-grid tw-items-end" style="height: 250px;">
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
              <div class="tw-flex-col-spread"><div class="ec-flex-grid-story__column">.tw-flex-col-spread</div></div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Vertical alignment (self)</h2>
          <div class="ec-flex-grid-story__container ec-flex-grid-story__container--with-border">
            <div class="tw-flex-grid" style="height: 250px;">
              <div class="tw-flex-col-spread tw-self-end"><div class="ec-flex-grid-story__column">.tw-flex-col-spread.tw-self-end</div></div>
              <div class="tw-flex-col-spread tw-self-center"><div class="ec-flex-grid-story__column">.tw-flex-col-spread.tw-self-center</div></div>
              <div class="tw-flex-col-spread tw-self-start"><div class="ec-flex-grid-story__column">.tw-flex-col-spread.tw-self-start</div></div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Horizontal alignment</h2>
          <div class="ec-flex-grid-story__container ec-flex-grid-story__container--with-border">
            <h3>.tw-justify-between</h3>
            <div class="tw-flex-grid tw-justify-between">
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
            </div>
          </div>

          <h2 class="ec-flex-grid-story__title">Horizontal alignment</h2>
          <div class="ec-flex-grid-story__container ec-flex-grid-story__container--with-border">
            <h3>.tw-justify-center</h3>
            <div class="tw-flex-grid tw-justify-center">
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
            </div>
          </div>
        </div>
      `,
    };
  },
};

export const Margins: StoryObj = {
  render() {
    return {
      template: `
        <div class="ec-flex-grid-story">
          <h1 class="ec-flex-grid-story__title">Margins</h1>

          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
              <div class="tw-flex-col-2 tw-ml-auto"><div class="ec-flex-grid-story__column">.tw-flex-col-2.tw-ml-auto</div></div>
              <div class="tw-w-full"></div>
              <div class="tw-flex-col-2 tw-mr-auto"><div class="ec-flex-grid-story__column">.tw-flex-col-2.tw-mr-auto</div></div>
              <div class="tw-flex-col-2"><div class="ec-flex-grid-story__column">.tw-flex-col-2</div></div>
            </div>
          </div>
        </div>
      `,
    };
  },
};

export const Nested: StoryObj = {
  render() {
    return {
      template: `
        <div class="ec-flex-grid-story">
          <h1 class="ec-flex-grid-story__title">12 Columns - 24 pixel gutters</h1>

          <h2 class="ec-flex-grid-story__title">Normal</h2>
          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div
                v-for="i in 12"
                class="tw-flex-col-1">
                <div class="ec-flex-grid-story__column">.tw-flex-col-1<div>{{ i }}</div></div>
              </div>
            </div>
          </div>

          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div class="tw-flex-col-6">
                <div class="ec-flex-grid-story__column">
                  <h3>.tw-flex-col-6</h3>

                  <div class="tw-border tw-border-solid tw-border-key-4 tw-border-t-none">
                    <h3>.tw-flex-grid</h3>

                    <div class="tw-flex-grid">
                      <div
                        v-for="i in 3"
                        class="tw-flex-col-4">
                          <div class="ec-flex-grid-story__column">.tw-flex-col-4</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tw-flex-col-6">
                <div class="ec-flex-grid-story__column">
                  <h3>.tw-flex-col-6</h3>

                  <div class="tw-border tw-border-solid tw-border-key-4 tw-border-t-none">
                    <h3>.tw-flex-grid</h3>

                    <div class="tw-flex-grid">
                      <div
                        v-for="i in 3"
                        class="tw-flex-col-full">
                          <div class="ec-flex-grid-story__column">.tw-flex-col-full</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    };
  },
};

export const Responsive: StoryObj = {
  render() {
    return {
      template: `
        <div class="ec-flex-grid-story">
          <h1 class="ec-flex-grid-story__title">Resize to swap between different column sizes @xs @sm @md @lg @xl breakpoints</h1>
          <h2 class="ec-flex-grid-story__title">Parent: tw-flex-grid</h2>

          <div class="ec-flex-grid-story__container">
            <div class="tw-flex-grid">
              <div class="tw-flex-col-full sm:tw-flex-col-6 md:tw-flex-col-8 lg:tw-flex-col-4 xl:tw-flex-col-2">
                <div class="ec-flex-grid-story__column tw-text-gray-3">
                  <div class="tw-text-gray-6">tw-flex-col-full</div>
                  <div class="sm:tw-text-gray-6">sm:tw-flex-col-6</div>
                  <div class="md:tw-text-gray-6">md:tw-flex-col-8</div>
                  <div class="lg:tw-text-gray-6">lg:tw-flex-col-4</div>
                  <div class="xl:tw-text-gray-6">xl:tw-flex-col-2</div>
                </div>
              </div>

              <div class="tw-flex-col-full sm:tw-flex-col-6 md:tw-flex-col-4 lg:tw-flex-col-8 xl:tw-flex-col-10">
                <div class="ec-flex-grid-story__column tw-text-gray-3">
                  <div class="tw-text-gray-6">tw-flex-col-full</div>
                  <div class="sm:tw-text-gray-6">sm:tw-flex-col-6</div>
                  <div class="md:tw-text-gray-6">md:tw-flex-col-4</div>
                  <div class="lg:tw-text-gray-6">lg:tw-flex-col-8</div>
                  <div class="xl:tw-text-gray-6">xl:tw-flex-col-10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    };
  },
};
