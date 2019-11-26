/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import { storiesOf } from '@storybook/vue';
import './_ec-grid.story.scss';

const stories = storiesOf('Grid', module);

stories
  .add('basic', () => ({
    template: `
    <div class="grid-story">
      <h1 class="grid-story__title">12 Columns - 24 pixel gutters</h1>
      <div class="ec-grid ec-grid--row-sm grid-story__container">
        <div
          v-for="i in 12"
          class="ec-col-1 grid-story__column">
          <p>.ec-col-1</p>
        </div>
      </div>

      <h1 class="grid-story__title">.ec-grid</h1>
      <div class="ec-grid ec-grid--row-sm grid-story__container">
        <div
          v-for="i in 6"
          class="ec-col-2 grid-story__column">
          <p>.ec-col-2</p>
        </div>
      </div>

      <h1 class="grid-story__title">.ec-grid</h1>
      <div class="ec-grid ec-grid--row-sm grid-story__container">
        <div
          v-for="i in 4"
          class="ec-col-3 grid-story__column">
          <p>.ec-col-3</p>
        </div>
      </div>

      <h1 class="grid-story__title">.ec-grid</h1>
      <div class="ec-grid ec-grid--row-sm grid-story__container">
        <div
          v-for="i in 3"
          class="ec-col-4 grid-story__column">
          <p>.ec-col-4</p>
        </div>
      </div>

      <h1 class="grid-story__title">.ec-grid</h1>
      <div class="ec-grid ec-grid--row-sm grid-story__container">
        <div
          v-for="i in 2"
          class="ec-col-6 grid-story__column">
          <p>.ec-col-6</p>
        </div>
      </div>
    </div>
    `,
  }))
  .add('Full Width vs Normal', () => ({
    template: `
    <div class="grid-story">
      <h1 class="grid-story__title">.ec-grid</h1>
      <div class="ec-grid ec-grid--row-sm ec-grid--full-width grid-story__container">
        <div
          v-for="i in 12"
          class="ec-col-1 grid-story__column">
          <p>.ec-col-1</p>
        </div>
      </div>

      <h1 class="grid-story__title">.ec-grid</h1>
      <div class="ec-grid ec-grid--row-sm grid-story__container">
        <div
          v-for="i in 12"
          class="ec-col-1 grid-story__column">
          <p>.ec-col-1</p>
        </div>
      </div>
    </div>
    `,
  }))
  .add('Nested', () => ({
    template: `
    <div class="grid-story">
      <h1 class="grid-story__title">.ec-grid</h1>
      <div class="ec-grid ec-grid--row-sm grid-story__container">
        <div class="ec-col-6 grid-story__column">
          <h1 style="font-size: 20px;">.ec-col-6</h1>
          <div style="border:1px solid black;padding:5px;margin:5px;">
            <h1 style="font-size: 20px;">.ec-grid</h1>
            <div class="ec-grid ec-grid--full-width">
              <div
                v-for="i in 3"
                class="ec-col-4 grid-story__column">
                <p>.ec-col-4</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ec-col-6 grid-story__column">
          <p>.ec-col-6</p>
        </div>
      </div>
    </div>
    `,
  }))


  .add('Responsive', () => ({
    template: `
    <div class="grid-story">
      <h1 class="grid-story__title">Responsive - Resize to see swap between column and row</h1>
      <h1 class="grid-story__title">
      ec-grid ec-grid--col-xs ec-grid--row-sm ec-grid--col--md ec-grid--row-lg ec-grid--col-xl ec-grid--row-2xl </h1>

      <div class="ec-grid ec-grid--col-xs ec-grid--row-sm ec-grid--col--md ec-grid--row-lg ec-grid--col-xl ec-grid--row-2xl grid-story__container">
        <div
          v-for="i in 4"
          class="ec-col-3 grid-story__column">
          <p>.ec-col-3</p>
        </div>
      </div>
    </div>
  `,
  }))
  .add('TFO example', () => ({
    template: `
      <div class="ec-ml--24 ec-mr--24">
        <div class="ec-grid ec-grid--full-width ec-align-center-md ec-grid--col-xs ec-grid--row-md">
          <div class="ec-col-9">
            <h1>Lending</h1>
            <p> Here you will be able to keep track of all your requests.
          </div>

          <button class="ec-col-3 ec-btn ec-btn--md ec-btn--rounded ec-btn--primary">New Request</button>
        </div>

        <div class="ec-grid ec-grid--full-width ec-grid--col-xs ec-grid--row-md">
          <div class="ec-col-8" style="height; border: 1px solid black;"> Credit line component</div>
          <div class="ec-col-4" style="height:200px; border: 1px solid black;"> Management card component</div>
        </div>

        <div class="ec-grid ec-grid--full-width ec-grid--row-xs">
          <div class="ec-col-12" style="border:1px solid black;height:200px;">
            This is the requests container
          </div>
        </div>
      </div>
    `,
  }));
