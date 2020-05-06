// import { storiesOf } from '@storybook/vue';
// import './ec-grid.story.scss';

// const stories = storiesOf('Grid', module);

// stories
//   .add('rows', () => ({
//     template: `
//     <div class="ec-grid-story">
//       <h1 class="ec-grid-story__title">12 Columns - 24 pixel gutters</h1>
//       <h2 class="ec-grid-story__title">Grandparent: "ec-grid", Parent: "ec-grid__row" Child: "ec-col-1 to ec-12"</h2>
//       <h2 class="ec-grid-story__title">Normal</h2>
//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__row">
//           <div
//             v-for="i in 12"
//             class="ec-col-1 ec-grid-story__column">
//             <p>.ec-col-1 <div>{{ i }}</div></p>
//           </div>
//         </div>
//       </div>

//       <h1 class="ec-grid-story__title">Reverse</h1>
//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__row--reverse">
//           <div
//             v-for="i in 12"
//             class="ec-col-1 ec-grid-story__column">
//             <p>.ec-col-1 <div>{{ i }}</div></p>
//           </div>
//         </div>
//       </div>

//       <h1 class="ec-grid-story__title">Wrap</h1>
//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__row ec-grid__row--wrap ">
//           <div
//             v-for="i in 18"
//             class="ec-col-1 ec-grid-story__column">
//             <p>.ec-col-1 <div>{{ i }}</div></p>
//           </div>
//         </div>
//       </div>

//       <h1 class="ec-grid-story__title">Offset</h1>
//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__row">
//           <div class="ec-col-1 ec-offset-1 ec-grid-story__column"><p>.ec-offset-1</p></div>
//           <div class="ec-col-1 ec-offset-2 ec-grid-story__column"><p>.ec-offset-2</p></div>
//           <div class="ec-col-1 ec-offset-4 ec-grid-story__column"><p>.ec-offset-4</p></div>
//         </div>
//       </div>

//       <h1 class="ec-grid-story__title">Various column combinations</h1>
//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__row">
//           <div class="ec-col-2 ec-grid-story__column"><p>.ec-col-2</p></div>
//           <div class="ec-col-4 ec-grid-story__column"><p>.ec-col-4</p></div>
//           <div class="ec-col-6 ec-grid-story__column"><p>.ec-col-6</p></div>
//         </div>
//       </div>
//     </div>
//     `,
//   }))
//   .add('columns', () => ({
//     template: `
//     <div class="ec-grid-story">
//       <h1 class="ec-grid-story__title">12 Columns - 24 pixel gutters</h1>
//       <h2 class="ec-grid-story__title">Grandparent: "ec-grid", Parent: "ec-grid__col" Child: "ec-col-1 to ec-12"</h2>
//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__col">
//           <div
//             v-for="i in 12"
//             class="ec-col-1 ec-grid-story__column">
//             <p>.ec-col-1 <div>{{i}}</div></p>
//           </div>
//         </div>
//       </div>
//     </div>
//     `,
//   }))
//   .add('nested', () => ({
//     template: `
//     <div class="ec-grid-story">
//       <h1 class="ec-grid-story__title">.ec-grid</h1>

//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__row">
//           <div class="ec-col-6 ec-grid-story__column">
//             <h1 style="font-size: 20px;">.ec-col-6</h1>
//             <div style="border:1px solid black;padding:5px;margin:5px;">
//               <h1 style="font-size: 20px;">.ec-grid</h1>

//                 <div class="ec-grid">
//                   <div class="ec-grid__row">
//                     <div
//                       v-for="i in 3"
//                       class="ec-col-4 ec-grid-story__column">
//                       <p>.ec-col-4</p>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//           </div>

//           <div class="ec-col-6 ec-grid-story__column">
//             <h1 style="font-size: 20px;">.ec-col-6</h1>
//             <div style="border:1px solid black;padding:5px;margin:5px;">
//             <h1 style="font-size: 20px;">.ec-grid</h1>
//             <div class="ec-grid">
//               <div class="ec-grid__col">
//                 <div
//                   v-for="i in 3"
//                   class="ec-col-4 ec-grid-story__column">
//                   <p>.ec-col-4</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//     `,
//   }))
//   .add('responsive', () => ({
//     template: `
//     <div class="ec-grid-story">
//       <h1 class="ec-grid-story__title">Resize to swap between column and row @xs @sm @md @lg @xl breakpoints</h1>
//       <h2 class="ec-grid-story__title">Grandparent: ec-grid</h2>
//       <h2 class="ec-grid-story__title"> Parent: ec-grid__col ec-grid__row@xs ec-grid__col@sm ec-grid__row@md ec-grid__col@lg ec-grid__row@xl</h2>

//       <div class="ec-grid ec-grid-story__container">
//         <div class="ec-grid__col ec-grid__row@xs ec-grid__col@sm ec-grid__row@md ec-grid__col@lg ec-grid__row@xl">
//           <div
//             v-for="i in 4"
//             class="ec-col-3 ec-grid-story__column">
//             <p>.ec-col-3</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   }))
//   .add('tfo example', () => ({
//     template: `
//       <div class="ec-ml--24 ec-mr--24">
//         <div class="ec-grid">
//           <div class="ec-grid__col ec-grid__row@md">
//             <div class="ec-col-9">
//               <h1>Trade Finance</h1>
//               <p> Here you will be able to keep track of all your requests.</p>
//             </div>
//             <div class="ec-col-3" style="align-self: center;text-align:right;">
//               <button class="ec-column ec-btn ec-btn-@md ec-btn--rounded ec-btn--primary">New Request</button>
//             </div>
//           </div>
//         </div>

//         <div class="ec-grid">
//           <div class="ec-grid__col ec-grid__row@md">
//             <div class="ec-col-8" style="height:200px; border: 1px solid black;"> Credit line component</div>
//             <div class="ec-col-4" style="height:200px; border: 1px solid black;"> Management card component</div>
//           </div>
//         </div>

//         <div class="ec-grid">
//           <div class="ec-grid__row">
//             <div class="ec-col-12" style="border:1px solid black;height:200px;">
//               This is the requests container
//             </div>
//         </div>
//       </div>
//     </div>
//     `,
//   }));
