/* eslint-disable array-bracket-spacing */
const plugin = require('tailwindcss/plugin');

// see https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
// for reference config
module.exports = {
  // we don't use built-in purge because:
  // 1. we have specific scenarios which we don't want to be purged -> tailwind.story.css
  // 2. we need to tweak the purgecss config in the real application
  // 3. we want to have purgecss available for other parts of the code in the future, e.g. purging other 3rd party libraries
  // so we set up purgecss manually. see: https://tailwindcss.com/docs/controlling-file-size/#setting-up-purgecss-manually
  purge: false,
  target: 'ie11',
  prefix: 'tw-',
  important: false,
  separator: ':',
  theme: {
    screens: {
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1960px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      dark: 'hsl(var(--ec-dark-color))',
      light: 'hsl(var(--ec-light-color))',

      key: {
        1: 'hsl(var(--ec-key-color-level-1))',
        2: 'hsl(var(--ec-key-color-level-2))',
        3: 'hsl(var(--ec-key-color-level-3))',
        4: 'hsl(var(--ec-key-color-level-4))',
        5: 'hsl(var(--ec-key-color-level-5))',
        6: 'hsl(var(--ec-key-color-level-6))',
        7: 'hsl(var(--ec-key-color-level-7))',
      },

      gray: {
        1: 'hsl(var(--ec-gray-color-level-1))',
        2: 'hsl(var(--ec-gray-color-level-2))',
        3: 'hsl(var(--ec-gray-color-level-3))',
        4: 'hsl(var(--ec-gray-color-level-4))',
        5: 'hsl(var(--ec-gray-color-level-5))',
        6: 'hsl(var(--ec-gray-color-level-6))',
        7: 'hsl(var(--ec-gray-color-level-7))',
      },

      additional: {
        18: 'hsl(var(--ec-additional-color-level-18))',
        51: 'hsl(var(--ec-additional-color-level-51))',
        64: 'hsl(var(--ec-additional-color-level-64))',
        140: 'hsl(var(--ec-additional-color-level-140))',
        166: 'hsl(var(--ec-additional-color-level-166))',
        215: 'hsl(var(--ec-additional-color-level-215))',
        266: 'hsl(var(--ec-additional-color-level-266))',
        280: 'hsl(var(--ec-additional-color-level-280))',
        297: 'hsl(var(--ec-additional-color-level-297))',
        325: 'hsl(var(--ec-additional-color-level-325))',
      },

      error: {
        default: 'hsl(var(--ec-reserved-color-error))',
        hover: 'hsl(var(--ec-reserved-color-error-hover))',
      },

      info: {
        default: 'hsl(var(--ec-reserved-color-info))',
        hover: 'hsl(var(--ec-reserved-color-info-hover))',
      },

      success: {
        default: 'hsl(var(--ec-reserved-color-success))',
        hover: 'hsl(var(--ec-reserved-color-success-hover))',
      },

      warning: {
        default: 'hsl(var(--ec-reserved-color-warning))',
        hover: 'hsl(var(--ec-reserved-color-warning-hover))',
      },
    },
    spacing: {
      // px: '1px',
      0: '0',
      1: '1px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
    },
    backgroundColor: theme => theme('colors'),
    // backgroundPosition: {
    //   bottom: 'bottom',
    //   center: 'center',
    //   left: 'left',
    //   'left-bottom': 'left bottom',
    //   'left-top': 'left top',
    //   right: 'right',
    //   'right-bottom': 'right bottom',
    //   'right-top': 'right top',
    //   top: 'top',
    // },
    // backgroundSize: {
    //   auto: 'auto',
    //   cover: 'cover',
    //   contain: 'contain',
    // },
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.level-4', 'currentColor'),
    }),
    // borderOpacity: theme => theme('opacity'),
    borderRadius: {
      none: '0',
      sm: '2px',
      default: '5px',
      button: '32px',
      '1/2': '50%',
    },
    borderWidth: {
      default: '1px',
      0: '0',
      // 2: '2px',
      // 4: '4px',
      // 8: '8px',
    },
    boxShadow: {
      // xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      // sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      // default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      // md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      // lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      // xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      // '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      // inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      // outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
      'level-0': '0 2px 4px 0 hsla(0, 0%, 0%, 0.1)',
      'level-1': '0 3px 6px 0 hsla(0, 0%, 0%, 0.2)',
      'level-1-rtl': '-3px 0 6px 0 hsla(0, 0%, 0%, 0.2)',
      'level-2': '0 10px 20px 0 hsla(0, 0%, 0%, 0.2)',
    },
    container: {},
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },
    // divideColor: theme => theme('borderColor'),
    // divideOpacity: theme => theme('borderOpacity'),
    // divideWidth: theme => theme('borderWidth'),
    fill: theme => theme('colors'),
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      0: '0',
      default: '1',
    },
    flexShrink: {
      0: '0',
      default: '1',
    },
    fontFamily: {
      sans: [
        // 'system-ui',
        // '-apple-system',
        // 'BlinkMacSystemFont',
        // '"Segoe UI"',
        'Roboto',
        // '"Helvetica Neue"',
        // 'Arial',
        // '"Noto Sans"',
        'sans-serif',
        // '"Apple Color Emoji"',
        // '"Segoe UI Emoji"',
        // '"Segoe UI Symbol"',
        // '"Noto Color Emoji"',
      ],
      'sans-condensed': ['Roboto Condensed', 'sans-serif'],
      // serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    // fontSize: {
    //   xs: '0.75rem',
    //   sm: '0.875rem',
    //   base: '1rem',
    //   lg: '1.125rem',
    //   xl: '1.25rem',
    //   '2xl': '1.5rem',
    //   '3xl': '1.875rem',
    //   '4xl': '2.25rem',
    //   '5xl': '3rem',
    //   '6xl': '4rem',
    // },
    // fontWeight: {
    //   hairline: '100',
    //   thin: '200',
    //   light: '300',
    //   normal: '400',
    //   medium: '500',
    //   semibold: '600',
    //   bold: '700',
    //   extrabold: '800',
    //   black: '900',
    // },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    inset: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      auto: 'auto',
    }),
    // letterSpacing: {
    //   tighter: '-0.05em',
    //   tight: '-0.025em',
    //   normal: '0',
    //   wide: '0.025em',
    //   wider: '0.05em',
    //   widest: '0.1em',
    // },
    // lineHeight: {
    //   none: '1',
    //   tight: '1.25',
    //   snug: '1.375',
    //   normal: '1.5',
    //   relaxed: '1.625',
    //   loose: '2',
    //   3: '.75rem',
    //   4: '1rem',
    //   5: '1.25rem',
    //   6: '1.5rem',
    //   7: '1.75rem',
    //   8: '2rem',
    //   9: '2.25rem',
    //   10: '2.5rem',
    // },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    maxHeight: {
      full: '100%',
      screen: '100vh',
    },
    maxWidth: (theme, { breakpoints }) => ({
      none: 'none',
      paragraph: '75ch',
      // xs: '20rem',
      // sm: '24rem',
      // md: '28rem',
      // lg: '32rem',
      // xl: '36rem',
      // '2xl': '42rem',
      // '3xl': '48rem',
      // '4xl': '56rem',
      // '5xl': '64rem',
      // '6xl': '72rem',
      full: '100%',
      ...breakpoints(theme('screens')),
    }),
    minHeight: theme => ({
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    minWidth: theme => ({
      ...theme('spacing'),
      full: '100%',
    }),
    // objectPosition: {
    //   bottom: 'bottom',
    //   center: 'center',
    //   left: 'left',
    //   'left-bottom': 'left bottom',
    //   'left-top': 'left top',
    //   right: 'right',
    //   'right-bottom': 'right bottom',
    //   'right-top': 'right top',
    //   top: 'top',
    // },
    opacity: {
      0: '0',
      // 25: '0.25',
      // 50: '0.5',
      // 75: '0.75',
      100: '1',
    },
    order: {
      // first: '-9999',
      // last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
    padding: theme => theme('spacing'),
    // placeholderColor: theme => theme('colors'),
    // placeholderOpacity: theme => theme('opacity'),
    // space: (theme, { negative }) => ({
    //   ...theme('spacing'),
    //   ...negative(theme('spacing')),
    // }),
    stroke: {
      current: 'currentColor',
    },
    strokeWidth: {
      0: '0',
      1: '1',
      2: '2',
    },
    textColor: theme => theme('colors'),
    // textOpacity: theme => theme('opacity'),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '3/3': '100%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '4/4': '100%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '5/5': '100%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '6/6': '100%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      '12/12': '100%',
      full: '100%',
      screen: '100vw',
    }),
    zIndex: {
      auto: 'auto',
      notification: 300,
      loading: 250,
      modal: 200,
      tooltip: 100,
      'level-1': 10,
      'level-2': 20,
      'level-3': 30,
    },
    // gap: theme => theme('spacing'),
    // gridTemplateColumns: {
    //   none: 'none',
    //   1: 'repeat(1, minmax(0, 1fr))',
    //   2: 'repeat(2, minmax(0, 1fr))',
    //   3: 'repeat(3, minmax(0, 1fr))',
    //   4: 'repeat(4, minmax(0, 1fr))',
    //   5: 'repeat(5, minmax(0, 1fr))',
    //   6: 'repeat(6, minmax(0, 1fr))',
    //   7: 'repeat(7, minmax(0, 1fr))',
    //   8: 'repeat(8, minmax(0, 1fr))',
    //   9: 'repeat(9, minmax(0, 1fr))',
    //   10: 'repeat(10, minmax(0, 1fr))',
    //   11: 'repeat(11, minmax(0, 1fr))',
    //   12: 'repeat(12, minmax(0, 1fr))',
    // },
    // gridColumn: {
    //   auto: 'auto',
    //   'span-1': 'span 1 / span 1',
    //   'span-2': 'span 2 / span 2',
    //   'span-3': 'span 3 / span 3',
    //   'span-4': 'span 4 / span 4',
    //   'span-5': 'span 5 / span 5',
    //   'span-6': 'span 6 / span 6',
    //   'span-7': 'span 7 / span 7',
    //   'span-8': 'span 8 / span 8',
    //   'span-9': 'span 9 / span 9',
    //   'span-10': 'span 10 / span 10',
    //   'span-11': 'span 11 / span 11',
    //   'span-12': 'span 12 / span 12',
    // },
    // gridColumnStart: {
    //   auto: 'auto',
    //   1: '1',
    //   2: '2',
    //   3: '3',
    //   4: '4',
    //   5: '5',
    //   6: '6',
    //   7: '7',
    //   8: '8',
    //   9: '9',
    //   10: '10',
    //   11: '11',
    //   12: '12',
    //   13: '13',
    // },
    // gridColumnEnd: {
    //   auto: 'auto',
    //   1: '1',
    //   2: '2',
    //   3: '3',
    //   4: '4',
    //   5: '5',
    //   6: '6',
    //   7: '7',
    //   8: '8',
    //   9: '9',
    //   10: '10',
    //   11: '11',
    //   12: '12',
    //   13: '13',
    // },
    // gridTemplateRows: {
    //   none: 'none',
    //   1: 'repeat(1, minmax(0, 1fr))',
    //   2: 'repeat(2, minmax(0, 1fr))',
    //   3: 'repeat(3, minmax(0, 1fr))',
    //   4: 'repeat(4, minmax(0, 1fr))',
    //   5: 'repeat(5, minmax(0, 1fr))',
    //   6: 'repeat(6, minmax(0, 1fr))',
    // },
    // gridRow: {
    //   auto: 'auto',
    //   'span-1': 'span 1 / span 1',
    //   'span-2': 'span 2 / span 2',
    //   'span-3': 'span 3 / span 3',
    //   'span-4': 'span 4 / span 4',
    //   'span-5': 'span 5 / span 5',
    //   'span-6': 'span 6 / span 6',
    // },
    // gridRowStart: {
    //   auto: 'auto',
    //   1: '1',
    //   2: '2',
    //   3: '3',
    //   4: '4',
    //   5: '5',
    //   6: '6',
    //   7: '7',
    // },
    // gridRowEnd: {
    //   auto: 'auto',
    //   1: '1',
    //   2: '2',
    //   3: '3',
    //   4: '4',
    //   5: '5',
    //   6: '6',
    //   7: '7',
    // },
    // transformOrigin: {
    //   center: 'center',
    //   top: 'top',
    //   'top-right': 'top right',
    //   right: 'right',
    //   'bottom-right': 'bottom right',
    //   bottom: 'bottom',
    //   'bottom-left': 'bottom left',
    //   left: 'left',
    //   'top-left': 'top left',
    // },
    // scale: {
    //   0: '0',
    //   50: '.5',
    //   75: '.75',
    //   90: '.9',
    //   95: '.95',
    //   100: '1',
    //   105: '1.05',
    //   110: '1.1',
    //   125: '1.25',
    //   150: '1.5',
    // },
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      0: '0',
      45: '45deg',
      90: '90deg',
      180: '180deg',
    },
    // translate: (theme, { negative }) => ({
    translate: {
      // ...theme('spacing'),
      // ...negative(theme('spacing')),
      '-full': '-100%',
      '-1/2': '-50%',
      '1/2': '50%',
      full: '100%',
    },
    // skew: {
    //   '-12': '-12deg',
    //   '-6': '-6deg',
    //   '-3': '-3deg',
    //   0: '0',
    //   3: '3deg',
    //   6: '6deg',
    //   12: '12deg',
    // },
    transitionProperty: {
      none: 'none',
      all: 'all',
      default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      text: 'color',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },
    transitionTimingFunction: {
      linear: 'linear',
      default: 'ease',
      in: 'ease-in',
      out: 'ease-out',
      'in-out': 'ease-in-out',
      // in: 'cubic-bezier(0.4, 0, 1, 1)',
      // out: 'cubic-bezier(0, 0, 0.2, 1)',
      // 'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transitionDuration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionDelay: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    typography: theme => ({
      h1: { fontSize: '35px', lineHeight: '40px', fontWeight: 400 },
      h2: { fontSize: '25px', lineHeight: '35px', fontWeight: 300 },
      h3: { fontSize: '20px', lineHeight: '30px', fontWeight: 500 },
      h4: { fontSize: '18px', lineHeight: '24px', fontWeight: 300 },
      h5: { fontSize: '16px', lineHeight: '26px', fontWeight: 500 },
      h6: {
        fontSize: '14px', lineHeight: '24px', fontWeight: 500, textTransform: 'uppercase',
      },
      'body-text': { fontSize: '16px', lineHeight: '24px', fontWeight: 400 },
      'body-strong': { fontSize: '16px', lineHeight: '24px', fontWeight: 700 },
      'body-condensed': {
        fontSize: '16px', lineHeight: '24px', fontWeight: 400, fontFamily: theme('fontFamily.sans-condensed').join(', '),
      },
      'small-text': { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
      'mini-header': {
        fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: theme('textColor.gray.5'), textTransform: 'uppercase',
      },
      'caption-text': {
        fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: theme('textColor.gray.5'),
      },
      'input-label': {
        fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: theme('textColor.gray.3'),
      },
      'table-header': {
        fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: theme('textColor.gray.5'),
      },
      'btn-text': { fontSize: '16px', lineHeight: '22px', fontWeight: 400 },
      'flags-text': { fontSize: '12px', lineHeight: '20px', fontWeight: 400 },
    }),
  },
  variants: {
    accessibility: [ /* 'responsive', 'focus' */ ],
    alignContent: [ /* 'responsive' */ ],
    alignItems: [ /* 'responsive' */ ],
    alignSelf: [ /* 'responsive' */ ],
    appearance: [ /* 'responsive' */ ],
    backgroundAttachment: [ /* 'responsive' */ ],
    backgroundColor: [ /* 'responsive', */ 'hover', 'focus' ],
    backgroundOpacity: [ /* 'responsive', 'hover', 'focus' */ ],
    backgroundPosition: [ /* 'responsive' */ ],
    backgroundRepeat: [ /* 'responsive' */ ],
    backgroundSize: [ /* 'responsive' */ ],
    borderCollapse: [ /* 'responsive' */ ],
    borderColor: [ /* 'responsive', 'hover', 'focus' */ ],
    borderOpacity: [ /* 'responsive', 'hover', 'focus' */ ],
    borderRadius: [ /* 'responsive' */ ],
    borderStyle: [ /* 'responsive' */ ],
    borderWidth: [ /* 'responsive' */ ],
    boxShadow: [ /* 'responsive', 'hover', 'focus' */ ],
    boxSizing: [ /* 'responsive' */ ],
    cursor: [ /* 'responsive' */ ],
    display: [ 'responsive' ],
    divideColor: [ /* 'responsive' */ ],
    divideOpacity: [ /* 'responsive' */ ],
    divideWidth: [ /* 'responsive' */ ],
    fill: [ /* 'responsive', */ 'hover', 'focus' ],
    flex: [ 'responsive' ],
    flexDirection: [ 'responsive' ],
    flexGrow: [ /* 'responsive' */ ],
    flexShrink: [ /* 'responsive' */ ],
    flexWrap: [ 'responsive' ],
    float: [ /* 'responsive' */ ],
    clear: [ /* 'responsive' */ ],
    fontFamily: [ /* 'responsive' */ ],
    fontSize: [ /* 'responsive' */ ],
    fontSmoothing: [ /* 'responsive' */ ],
    fontStyle: [ /* 'responsive' */ ],
    fontWeight: [ /* 'responsive', 'hover', 'focus' */ ],
    height: [ /* 'responsive' */ ],
    inset: [ /* 'responsive' */ ],
    justifyContent: [ /* 'responsive' */ ],
    letterSpacing: [ /* 'responsive' */ ],
    lineHeight: [ /* 'responsive' */ ],
    listStylePosition: [ /* 'responsive' */ ],
    listStyleType: [ /* 'responsive' */ ],
    margin: [ 'responsive' ],
    maxHeight: [ /* 'responsive' */ ],
    maxWidth: [ /* 'responsive' */ ],
    minHeight: [ /* 'responsive' */ ],
    minWidth: [ /* 'responsive' */ ],
    objectFit: [ /* 'responsive' */ ],
    objectPosition: [ /* 'responsive' */ ],
    opacity: [ /* 'responsive', 'hover', 'focus' */ ],
    order: [ /* 'responsive' */ ],
    outline: [ /* 'responsive', 'focus' */ ],
    overflow: [ /* 'responsive' */ ],
    padding: [ 'responsive' ],
    placeholderColor: [ /* 'responsive', 'focus' */ ],
    placeholderOpacity: [ /* 'responsive', 'focus' */ ],
    pointerEvents: [ /* 'responsive' */ ],
    position: [ /* 'responsive' */ ],
    resize: [ /* 'responsive' */ ],
    space: [ /* 'responsive' */ ],
    stroke: [ /* 'responsive' */ ],
    strokeWidth: [ /* 'responsive' */ ],
    tableLayout: [ /* 'responsive' */ ],
    textAlign: [ 'responsive' ],
    textColor: [ 'responsive', 'hover', 'focus' ],
    textOpacity: [ /* 'responsive', 'hover', 'focus' */ ],
    textDecoration: [ /* 'responsive', 'hover', 'focus' */ ],
    textTransform: [ /* 'responsive' */ ],
    userSelect: [ /* 'responsive' */ ],
    verticalAlign: [ /* 'responsive' */ ],
    visibility: [ /* 'responsive' */ ],
    whitespace: [ /* 'responsive' */ ],
    width: [ 'responsive' ],
    wordBreak: [ /* 'responsive' */ ],
    zIndex: [ /* 'responsive' */ ],
    gap: [ /* 'responsive' */ ],
    gridAutoFlow: [ /* 'responsive' */ ],
    gridTemplateColumns: [ /* 'responsive' */ ],
    gridColumn: [ /* 'responsive' */ ],
    gridColumnStart: [ /* 'responsive' */ ],
    gridColumnEnd: [ /* 'responsive' */ ],
    gridTemplateRows: [ /* 'responsive' */ ],
    gridRow: [ /* 'responsive' */ ],
    gridRowStart: [ /* 'responsive' */ ],
    gridRowEnd: [ /* 'responsive' */ ],
    transform: [ /* 'responsive' */ ],
    transformOrigin: [ /* 'responsive' */ ],
    scale: [ /* 'responsive', 'hover', 'focus' */ ],
    rotate: [ /* 'responsive', 'hover', 'focus' */ ],
    translate: [ /* 'responsive', 'hover', 'focus' */ ],
    skew: [ /* 'responsive', 'hover', 'focus' */ ],
    transitionProperty: [ /* 'responsive' */ ],
    transitionTimingFunction: [ /* 'responsive' */ ],
    transitionDuration: [ /* 'responsive' */ ],
    transitionDelay: [ /* 'responsive' */ ],
    typography: [],
  },
  corePlugins: {
    preflight: false, // we have our own reset/normalize process
    container: true,
    space: false, // it's going against BEM
    divideColor: false, // it's going against BEM
    divideWidth: false, // it's going against BEM
    divideOpacity: false, // it's going against BEM

    accessibility: true,
    alignContent: true,
    alignItems: true,
    alignSelf: true,
    appearance: false, // we build custom components
    backgroundAttachment: false,
    backgroundColor: true,
    backgroundOpacity: false, // uses local css variables - not supported by polyfill in IE11
    backgroundPosition: false, // very rarely used
    backgroundRepeat: true,
    backgroundSize: false, // very rarely used
    borderCollapse: false, // we need this only for a table
    borderColor: true,
    borderOpacity: false, // uses local css variables - not supported by polyfill in IE11
    borderRadius: true,
    borderStyle: true,
    borderWidth: true,
    boxShadow: true,
    boxSizing: false, // very rarely used
    cursor: true,
    display: true,
    fill: true,
    flex: true,
    flexDirection: true,
    flexGrow: true,
    flexShrink: true,
    flexWrap: true,
    float: false, // we don't use floats
    clear: false, // we don't use floats
    fontFamily: true,
    fontSize: false, // we have custom typography
    fontSmoothing: false, // who needs to change it in components?
    fontStyle: false, // we have custom typography
    fontWeight: false, // we have custom typography
    height: true,
    inset: true,
    justifyContent: true,
    letterSpacing: false, // we have custom typography
    lineHeight: false, // we have custom typography
    listStylePosition: false, // very rarely used
    listStyleType: true,
    margin: true,
    maxHeight: true,
    maxWidth: true,
    minHeight: true,
    minWidth: true,
    objectFit: false, // not supported by IE11
    objectPosition: false, // not supported by IE11
    opacity: true,
    order: true,
    outline: true,
    overflow: true,
    padding: true,
    placeholderColor: false, // very rarely used
    placeholderOpacity: false, // uses local css variables - not supported by polyfill in IE11
    pointerEvents: true,
    position: true,
    resize: true,
    stroke: true,
    strokeWidth: true,
    tableLayout: true,
    textAlign: true,
    textColor: true,
    textOpacity: false, // uses local css variables - not supported by polyfill in IE11
    textDecoration: true,
    textTransform: true,
    userSelect: true,
    verticalAlign: true,
    visibility: true,
    whitespace: true,
    width: true,
    wordBreak: true,
    zIndex: true,
    gap: false, // we don't use CSS grid
    gridAutoFlow: false, // we don't use CSS grid
    gridTemplateColumns: false, // we don't use CSS grid
    gridColumn: false, // we don't use CSS grid
    gridColumnStart: false, // we don't use CSS grid
    gridColumnEnd: false, // we don't use CSS grid
    gridTemplateRows: false, // we don't use CSS grid
    gridRow: false, // we don't use CSS grid
    gridRowStart: false, // we don't use CSS grid
    gridRowEnd: false, // we don't use CSS grid
    transform: false, // uses local css variables - not supported by polyfill in IE11
    transformOrigin: false, // very rarely used
    scale: false, // very rarely used
    rotate: true,
    translate: true,
    skew: false, // very rarely used
    transitionProperty: true,
    transitionTimingFunction: true,
    transitionDuration: true,
    transitionDelay: true,
  },
  plugins: [
    plugin(typographyPlugin),
    plugin(flexboxGridPlugin),
  ],
};

function typographyPlugin({ addUtilities, theme, e }) {
  const typography = theme('typography');
  const newUtilities = {};
  for (const [name, style] of Object.entries(typography)) {
    newUtilities[`.${e(name)}`] = style;
  }
  addUtilities(newUtilities);
}

function flexboxGridPlugin({ addUtilities, theme }) {
  // see https://getbootstrap.com/docs/4.0/layout/grid/ for reference
  const { gutter = 24, numberOfColumns = 12 } = theme('flexboxGrid', {});

  if (gutter % 2 !== 0) {
    throw new Error('Gutter must be divisible by 2');
  }

  if (numberOfColumns <= 0) {
    throw new Error('Number of columns must be a positive number');
  }

  const colClasses = [];
  for (let i = 1; i <= numberOfColumns; i++) {
    colClasses.push(`.col-${i}`);
  }

  const grid = {
    '.grid-container': {
      width: '100%',
      paddingRight: theme(`padding.${gutter / 2}`),
      paddingLeft: theme(`padding.${gutter / 2}`),
    },
    '.grid': {
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: theme(`margin.${gutter / -2}`),
      marginLeft: theme(`margin.${gutter / -2}`),
    },
    [`.col-full, .col, .col-auto, ${colClasses.join(', ')}`]: {
      width: '100%',
      position: 'relative',
      padding: theme(`padding.${gutter / 2}`),
      minHeight: theme('minHeight.1'),
    },
    [`.col, ${colClasses.join(', ')}`]: {
      maxWidth: '100%',
      flexGrow: 1,
      flexBasis: 0,
    },
  };

  for (let i = 1; i <= numberOfColumns; i++) {
    const percentage = theme(`width.${i}/${numberOfColumns}`);
    grid[`.col-${i}`] = {
      flex: `0 0 ${percentage}`,
      maxWidth: `${percentage}`,
    };

    grid[`.offset-${i}`] = {
      marginLeft: `${percentage}`,
    };
  }

  grid['.col-auto'] = {
    flex: '0 0 auto',
    maxWidth: 'none',
    width: 'auto',
  };

  addUtilities(grid, ['responsive']);
}
