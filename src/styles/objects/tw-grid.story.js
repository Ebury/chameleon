import './tw-grid.story.css';

export default {
  title: 'Grid',
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const basic = () => ({
  template: `
    <div class="ec-grid-story">
      <h1 class="ec-grid-story__title">12 Columns - 24 pixel gutters</h1>
      <h2 class="ec-grid-story__title">Parent: "tw-grid", Children: "tw-col; tw-col-[N,full,auto]; tw-offset-[N]"</h2>

      <h2 class="ec-grid-story__title">Normal</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div
            v-for="i in 12"
            class="tw-col-1">
            <div class="ec-grid-story__column">.tw-col-1 <div>{{ i }}</div></div>
          </div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Wrap</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div
            v-for="i in 18"
            class="tw-col-1">
            <div class="ec-grid-story__column">.tw-col-1 <div>{{ i }}</div></div>
          </div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Offset</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div class="tw-offset-1 tw-col-1"><div class="ec-grid-story__column">.tw-offset-1.tw-col-1</div></div>
          <div class="tw-offset-2 tw-col-2"><div class="ec-grid-story__column">.tw-offset-2.tw-col-2</div></div>
          <div class="tw-offset-4 tw-col-1"><div class="ec-grid-story__column">.tw-offset-4.tw-col-1</div></div>
          <div class="tw-offset-2 tw-col-2"><div class="ec-grid-story__column">.tw-offset-4.tw-col-2</div></div>
          <div class="tw-offset-3 tw-col-5"><div class="ec-grid-story__column">.tw-offset-3.tw-col-5</div></div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Equal spread</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div
            v-for="i in 4"
            class="tw-col">
            <div class="ec-grid-story__column">.tw-col</div>
          </div>
          <div class="tw-col-4">
            <div class="ec-grid-story__column">.tw-col-4</div>
          </div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Equal spread with line break</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div
            v-for="i in 3"
            class="tw-col">
            <div class="ec-grid-story__column">.tw-col</div>
          </div>
          <div class="tw-w-full"></div>
          <div
            v-for="i in 2"
            class="tw-col">
            <div class="ec-grid-story__column">.tw-col</div>
          </div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Various column combinations</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
          <div class="tw-col-4"><div class="ec-grid-story__column">.tw-col-4</div></div>
          <div class="tw-col-5"><div class="ec-grid-story__column">.tw-col-5</div></div>
          <div class="tw-col-3"><div class="ec-grid-story__column">.tw-col-3</div></div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Full width</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div class="tw-col-12"><div class="ec-grid-story__column">.tw-col-12</div></div>
          <div class="tw-col-12"><div class="ec-grid-story__column">.tw-col-12</div></div>
          <div class="tw-col-full"><div class="ec-grid-story__column">.tw-col-full</div></div>
          <div class="tw-col-full"><div class="ec-grid-story__column">.tw-col-full</div></div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Auto width</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
          <div class="tw-col-auto"><div class="ec-grid-story__column">.tw-col-auto</div></div>
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">In grid container (.tw-grid-container)</h2>
      <div class="ec-grid-story__container tw-grid-container">
        <div class="tw-grid">
          <div
            v-for="i in 12"
            class="tw-col-1">
            <div class="ec-grid-story__column">.tw-col-1 <div>{{ i }}</div></div>
          </div>
        </div>
      </div>
    </div>
    `,
});

export const alignments = () => ({
  template: `
    <div class="ec-grid-story">
      <h1 class="ec-grid-story__title">Vertical/horizontal alignment</h1>

      <h2 class="ec-grid-story__title">Vertical alignment</h2>
      <div class="ec-grid-story__container ec-grid-story__container--with-border">
        <h3>.tw-items-start</h3>
        <div class="tw-grid tw-items-start" style="height: 250px;">
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
        </div>
      </div>
      <div class="ec-grid-story__container ec-grid-story__container--with-border">
        <h3>.tw-items-center</h3>
        <div class="tw-grid tw-items-center" style="height: 250px;">
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
        </div>
      </div>
      <div class="ec-grid-story__container ec-grid-story__container--with-border">
        <h3>.tw-items-end</h3>
        <div class="tw-grid tw-items-end" style="height: 250px;">
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
          <div class="tw-col"><div class="ec-grid-story__column">.tw-col</div></div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Vertical alignment (self)</h2>
      <div class="ec-grid-story__container ec-grid-story__container--with-border">
        <div class="tw-grid" style="height: 250px;">
          <div class="tw-col tw-self-end"><div class="ec-grid-story__column">.tw-col.tw-self-end</div></div>
          <div class="tw-col tw-self-center"><div class="ec-grid-story__column">.tw-col.tw-self-center</div></div>
          <div class="tw-col tw-self-start"><div class="ec-grid-story__column">.tw-col.tw-self-start</div></div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Horizontal alignment</h2>
      <div class="ec-grid-story__container ec-grid-story__container--with-border">
        <h3>.tw-justify-between</h3>
        <div class="tw-grid tw-justify-between">
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
        </div>
      </div>

      <h2 class="ec-grid-story__title">Horizontal alignment</h2>
      <div class="ec-grid-story__container ec-grid-story__container--with-border">
        <h3>.tw-justify-center</h3>
        <div class="tw-grid tw-justify-center">
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
        </div>
      </div>
    </div>
    `,
});

export const margins = () => ({
  template: `
    <div class="ec-grid-story">
      <h1 class="ec-grid-story__title">Margins</h1>

      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
          <div class="tw-col-2 tw-ml-auto"><div class="ec-grid-story__column">.tw-col-2.tw-ml-auto</div></div>
          <div class="tw-w-full"></div>
          <div class="tw-col-2 tw-mr-auto"><div class="ec-grid-story__column">.tw-col-2.tw-mr-auto</div></div>
          <div class="tw-col-2"><div class="ec-grid-story__column">.tw-col-2</div></div>
        </div>
      </div>
    </div>
  `,
});

export const nested = () => ({
  template: `
    <div class="ec-grid-story">
      <h1 class="ec-grid-story__title">12 Columns - 24 pixel gutters</h1>

      <h2 class="ec-grid-story__title">Normal</h2>
      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div
            v-for="i in 12"
            class="tw-col-1">
            <div class="ec-grid-story__column">.tw-col-1 <div>{{ i }}</div></div>
          </div>
        </div>
      </div>

      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div class="tw-col-6">
            <div class="ec-grid-story__column">
              <h3>.tw-col-6</h3>

              <div class="tw-border tw-border-solid tw-border-key-4 tw-border-t-none">
                <h3>.tw-grid</h3>

                <div class="tw-grid">
                  <div
                    v-for="i in 3"
                    class="tw-col-4">
                      <div class="ec-grid-story__column">.tw-col-4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tw-col-6">
            <div class="ec-grid-story__column">
              <h3>.tw-col-6</h3>

              <div class="tw-border tw-border-solid tw-border-key-4 tw-border-t-none">
                <h3>.tw-grid</h3>

                <div class="tw-grid">
                  <div
                    v-for="i in 3"
                    class="tw-col-full">
                      <div class="ec-grid-story__column">.tw-col-full</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

export const responsive = () => ({
  template: `
    <div class="ec-grid-story">
      <h1 class="ec-grid-story__title">Resize to swap between different column sizes @xs @sm @md @lg @xl breakpoints</h1>
      <h2 class="ec-grid-story__title">Parent: tw-grid</h2>

      <div class="ec-grid-story__container">
        <div class="tw-grid">
          <div class="tw-col-full sm:tw-col-6 md:tw-col-8 lg:tw-col-4 xl:tw-col-2">
            <div class="ec-grid-story__column tw-text-gray-3">
              <div class="tw-text-gray-6">tw-col-full</div>
              <div class="sm:tw-text-gray-6">sm:tw-col-6</div>
              <div class="md:tw-text-gray-6">md:tw-col-8</div>
              <div class="lg:tw-text-gray-6">lg:tw-col-4</div>
              <div class="xl:tw-text-gray-6">xl:tw-col-2</div>
            </div>
          </div>

          <div class="tw-col-full sm:tw-col-6 md:tw-col-4 lg:tw-col-8 xl:tw-col-10">
            <div class="ec-grid-story__column tw-text-gray-3">
              <div class="tw-text-gray-6">tw-col-full</div>
              <div class="sm:tw-text-gray-6">sm:tw-col-6</div>
              <div class="md:tw-text-gray-6">md:tw-col-4</div>
              <div class="lg:tw-text-gray-6">lg:tw-col-8</div>
              <div class="xl:tw-text-gray-6">xl:tw-col-10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});
