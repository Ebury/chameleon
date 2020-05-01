import { storiesOf } from '@storybook/vue';
import { select, number } from '@storybook/addon-knobs';

const stories = storiesOf('CSS/Typography', module);

stories.add('fonts', () => ({
  props: {
    fontFamily: {
      default: select('fontFamily', ['tw-font-sans', 'tw-font-sans-condensed', 'tw-font-mono']),
    },
    fontWeight: {
      default: select('fontWeight', [300, 400, 500, 700], 400),
    },
    fontStyle: {
      default: select('fontStyle', ['', 'italic'], ''),
    },
    fontSize: {
      default: number('fontSize', 16, { min: 0, max: 48 }),
    },
    lineHeight: {
      default: number('lineHeight', 24, { min: 0, max: 48 }),
    },
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const {
      fontWeight, fontStyle, fontSize, fontFamily, lineHeight,
    } = this.$props;

    const style = {
      fontWeight,
      fontStyle,
      lineHeight: `${lineHeight}px`,
      fontSize: `${fontSize}px`,
      wordBreak: 'break-word',
    };

    return (
      <div class={`tw-p-24 ${fontFamily}`}>
        <p style={style}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales felis nec libero vehicula, sit amet gravida dolor cursus. Sed suscipit turpis eget blandit vestibulum. Quisque congue hendrerit metus, eget laoreet metus varius et. Aliquam euismod a lacus eu rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus in mi eu ligula feugiat aliquet. Duis imperdiet metus a semper tristique. Phasellus hendrerit massa at lectus porttitor, in maximus ligula ultricies. Aliquam sollicitudin dolor sed ligula interdum, et placerat neque consectetur. Vestibulum ut risus lorem.
        </p>
        <p style={style}>
          Morbi ultrices pellentesque ex. Etiam efficitur dapibus urna, vitae sollicitudin lectus efficitur id. Sed porta sapien non augue fringilla, vel ultrices nulla vestibulum. In vehicula sem a lobortis malesuada. Curabitur eu auctor ligula. Phasellus et luctus ex. Vivamus semper magna ante, vel feugiat quam vulputate et. Sed eleifend ante non ligula malesuada, ut scelerisque eros interdum. Duis condimentum augue sit amet ligula imperdiet pharetra. Nulla eget metus orci. Cras auctor, ex ullamcorper auctor aliquam, sapien risus efficitur orci, sit amet varius turpis leo at enim. Nullam at ornare dui, quis lacinia nulla.
        </p>
        <p style={style}>
          ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωάΆέΈέΉίϊΐΊόΌύΰϋΎΫΏĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]@/&\-+÷×=®©$€£¥¢:;,.*
        </p>
      </div>
    );
  },
}));
