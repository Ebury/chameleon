/* eslint-disable react/no-unescaped-entities */
export default { title: 'fonts' };
export const fonts = ({
  fontWeight, fontStyle, fontSize, fontFamily, lineHeight,
}) => ({
  render() {
    const style = {
      fontWeight,
      fontStyle,
      lineHeight: `${lineHeight}px`,
      fontSize: `${fontSize}px`,
      wordBreak: 'break-word',
    };

    return (
      <div class={`tw-p-24 ${fontFamily}`}>
        <div class="tw-mini-header">English</div>
        <p style={style}>
          In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.
        </p>
        <div class="tw-mini-header">Spanish</div>
        <p style={style}>
          En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.
        </p>
        <div class="tw-mini-header">Dutch</div>
        <p style={style}>
          In een dorp van La Mancha, waarvan ik de naam niet voor de geest wil halen, woonde niet lang geleden een van die heren die een lans in het lansrack hielden, een oude buckler, een magere hack, en een windhond voor de coursing.
        </p>
        <div class="tw-mini-header">German</div>
        <p style={style}>
          In einem Dorf in La Mancha, dessen Namen ich mir nicht merken möchte, lebte vor nicht allzu langer Zeit einer der Herren, die eine Lanze in der Lanzenstange halten, ein alter Schild, ein magerer Schreiberling und ein Windhund zum Coursing.
        </p>
        <div class="tw-mini-header">Polish</div>
        <p style={style}>
          W wiosce La Mancha, której nazwy nie mam ochoty przywoływać, nie żył długo jeden z tych dżentelmenów, którzy trzymają lancę w haku na lancę, starego bucklera, chudego hackera i szarego psa do coursingu.
        </p>
        <div class="tw-mini-header">French</div>
        <p style={style}>
          Dans un village de La Mancha, dont je n'ai pas envie de rappeler le nom, il n'y a pas longtemps que vit un de ces messieurs qui gardent une lance dans le porte-lance, un vieux bouclier, un hack maigre et un lévrier pour la course.
        </p>
        <div class="tw-mini-header">Portuguese</div>
        <p style={style}>
          Numa aldeia de La Mancha, cujo nome não tenho vontade de chamar, não viveu muito tempo desde que um daqueles cavalheiros que guardam uma lança na lance-rack, um velho buckler, um magro hack, e um galgo para o "coursing".
        </p>
        <div class="tw-mini-header">Italian</div>
        <p style={style}>
          In un villaggio di La Mancha, il cui nome non ho alcuna voglia di ricordare, non è passato molto tempo da quando uno di quei signori che tengono una lancia nel porta-lance, un vecchio scudo, uno scroccone magro e un levriero per il corteggiamento.
        </p>
        <div class="tw-mini-header">Czech</div>
        <p style={style}>
          Ve vesnici La Mancha, jejíž jméno si nechci připomenout, žil nedlouho poté, co jeden z těch pánů, kteří drží kopí v stojanu, starý pytlík, hubený hack a chrt pro coursing.
        </p>
        <div class="tw-mini-header">Hungarian</div>
        <p style={style}>
          La Mancha faluban, amelynek nevét nem vágyom felidézni, nem sokáig élt egyike azoknak az uraknak, akik lándzsát tartanak a lándzsás állványban, egy öreg csattanót, karcsú hacket és agarat. a tanfolyamért.
        </p>
        <div class="tw-mini-header">Simplified Chinese</div>
        <p style={style}>
          在拉曼恰的一个村子里，我不想叫出它的名字，不久前就住着一个在长枪架上放着长枪的绅士，一个老扣子，一匹瘦辔头，还有一条用来骑马的灰狗。
        </p>
        <div class="tw-mini-header">Traditional Chinese</div>
        <p style={style}>
          在一個我不想提起這個名字的拉曼查（La Mancha）村里，住在那兒的人不多，因為其中一位紳士在長槍架上保持著長矛，一個舊的衣帽匠，一個瘦瘦的傢伙和一隻靈緹犬求助。
        </p>
        <div class="tw-mini-header">Romanian</div>
        <p style={style}>
          Într-un sat din La Mancha, al cărui nume nu vreau să-l amintesc, nu a trăit mult timp de când unul dintre acei domni care țin o lance în lance, un vechi armă, un bâlci slab și un ogar pentru cursuri.
        </p>
        <div class="tw-mini-header">Greek</div>
        <p style={style}>
          Σε ένα χωριό La Mancha, το όνομα του οποίου δεν έχω καμία επιθυμία να θυμηθώ, δεν έζησε πολύς καιρός από έναν από αυτούς τους κυρίους που κρατούν μια λόγχη στο ράφι, έναν παλιό κάδο, ένα άπαχο χάκερ και ένα λαγωνικό για μαθήματα.
        </p>
        <div class="tw-mini-header">Bulgarian</div>
        <p style={style}>
          В едно село Ла Манча, чието име нямам никакво желание да си спомням, живя не след дълго един от онези господа, които държат копие в стойката за копие, стар щит, постен хак и хрътка за курсиране.
        </p>
        <div class="tw-mini-header">Special characters</div>
        <p style={style}>
          1234567890‘?’“!”(%)[#]@/&\-+÷×=®©$€£¥¢:;,.*
        </p>
      </div>
    );
  },
});

fonts.argTypes = {
  fontFamily: {
    options: ['tw-font-sans', 'tw-font-sans-condensed', 'tw-font-mono'],
    control: { type: 'select' },
  },
  fontWeight: {
    options: [300, 400, 500, 700],
    control: { type: 'select' },
  },
  fontStyle: {
    options: ['italic'],
    control: { type: 'select' },
  },
  fontSize: {
    control: { type: 'number', min: 0, max: 48 },
  },
  lineHeight: {
    control: { type: 'number', min: 0, max: 48 },
  },
};

fonts.args = {
  fontFamily: 'tw-font-sans',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 24,
};

fonts.parameters = {
  actions: { disable: true },
};
